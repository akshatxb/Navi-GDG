"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { RecommendationFormData } from "./RecommendationSection";

const RecommendationForm = ({ submitHandler }: { submitHandler: SubmitHandler<RecommendationFormData> }) => {

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RecommendationFormData>();

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Agricultural Data</CardTitle>
        <CardDescription>
          Enter details about your farming operation
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit(submitHandler)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="crop">Crop Type</Label>
            <Input
              id="crop"
              placeholder="e.g., Wheat, Corn, Rice"
              {...register("cropType", { required: "Crop type is required" })}
            />
            {errors.cropType && (
              <p className="text-sm text-destructive">{errors.cropType.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="landArea">Land Area (hectares)</Label>
            <Input
              id="landArea"
              type="number"
              step="0.01"
              placeholder="e.g., 10.5"
              {...register("landArea", { required: "Land area is required" })}
            />
            {errors.landArea && (
              <p className="text-sm text-destructive">{errors.landArea.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="soilQuality">Soil Quality</Label>
            <Controller
              name="soilQuality"
              control={control}
              rules={{ required: "Soil quality is required" }}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select soil quality" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="poor">Poor</SelectItem>
                    <SelectItem value="average">Average</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="excellent">Excellent</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.soilQuality && (
              <p className="text-sm text-destructive">{errors.soilQuality.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="season">Planting Season</Label>
            <Controller
              name="season"
              control={control}
              rules={{ required: "Season is required" }}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select season" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="spring">Spring</SelectItem>
                    <SelectItem value="summer">Summer</SelectItem>
                    <SelectItem value="fall">Fall</SelectItem>
                    <SelectItem value="winter">Winter</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.season && (
              <p className="text-sm text-destructive">{errors.season.message}</p>
            )}
          </div>
        </CardContent>

        <CardFooter>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing
              </>
            ) : (
              "Submit Agricultural Data"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default RecommendationForm;