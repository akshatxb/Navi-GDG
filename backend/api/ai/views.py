from django.conf import settings
from rest_framework.decorators import (
    api_view,
    permission_classes,
    authentication_classes,
)
from rest_framework.response import Response
from rest_framework import status
from google import genai
from google.genai import types
import logging
from pydantic import BaseModel
from typing import List, Literal
import json
from django_ratelimit.decorators import ratelimit


logger = logging.getLogger(__name__)


API_KEY = settings.GEMINI_API_KEY


class Resource(BaseModel):
    name: str
    quantity: str
    category: Literal["Seeds", "Fertilizers", "Herbicides", "Insecticides", "Other"]


class FarmingResponse(BaseModel):
    title: str
    crop: str
    landarea: str
    soilquality: str
    season: str
    description: str
    insights: List[str]
    resources: List[Resource]
    tools: List[str]
    water_requirement: str
    recommendations: List[str]
    confidence: int


def get_ai_response(cropType, landArea, season, soilQuality):
    """
    Generates an AI response using the Gemini v3 API.
    """

    client = genai.Client(api_key=API_KEY)

    sys_instruction = "Act as a knowledgeable farming assistant helping a farmer plan crop cultivation efficiently. You will receive inputs including the crop type, land area in square meters, soil quality, and the planting season (summer, spring, autumn, or winter). Based on these factors, provide a detailed list of required resources along with their precise quantities in kilograms. Additionally, specify the necessary tools essential for planting and maintaining the crop. Ensure the output is clear, structured, and directly actionable for the farmer."

    generationConfig = types.GenerateContentConfig(
        temperature=0.1,
        top_k=1,
        top_p=1,
        max_output_tokens=2048,
        system_instruction=sys_instruction,
        response_mime_type="application/json",
        response_schema=FarmingResponse,
    )

    message = f"Croptype : {cropType}, LandArea : {landArea}, Soil Quality : {soilQuality}, Season : {season}"

    try:
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            config=generationConfig,
            contents=message,
        )
        if response and response.text:
            response_dict = json.loads(response.text)
            return response_dict

        return None

    except Exception as e:
        logger.error("Error in AI response: %s", str(e))
        return None


@ratelimit(key="ip", rate="50/m", block=True)
@api_view(["POST"])
def assistant_view(request):
    """
    Handles the incoming request to get farming assistance from AI.
    """

    try:
        data = request.data
        cropType = data.get("cropType")
        landArea = data.get("landArea")
        season = data.get("season")
        soilQuality = data.get("soilQuality")

        if not all([cropType, landArea, season, soilQuality]):
            return Response(
                {
                    "error": "All fields (cropType, landArea, season, soilQuality) are required"
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        ai_response = get_ai_response(cropType, landArea, season, soilQuality)

        if ai_response:
            return Response({"data": ai_response}, status=status.HTTP_200_OK)

        return Response(
            {"message": "AI response could not be generated."},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )
    except Exception as e:
        return Response(
            {"error": f"Server Error: {str(e)}"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )
