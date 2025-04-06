"use client";

import { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { ProductAddForm, ProducUpdateForm } from "./ProductForm";
import slugify from "slugify";
import DataTableSkeleton from "./DataTableSkeleton";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { authenticatedFetch } from "@/lib/auth";

export type Product = {
    id: number;
    name: string;
    slug: string;
    category: string;
    price: number;
    stock: number;
    region: string;
    description: string;
}

const InventorySection = () => {

    const router = useRouter();
    const [open, setOpen] = useState<boolean>(false);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [editData, setEditData] = useState<Product>({
        id: 0,
        name: "",
        slug: "",
        category: "",
        price: 0,
        stock: 0,
        region: "",
        description: "",
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [dataLoaded, setDataLoaded] = useState<boolean>(false);
    const [products, setProducts] = useState<Product[]>([]);

    const onAddCommand = () => {
        setOpen(true);
    }

    const onEditCommand = async (data: Product) => {
        setEditData(data);
        setEditMode(true);
    }

    const onDeleteCommand = async (slug: string) => {
        try {
            const response = await authenticatedFetch(router, "DELETE", process.env.NEXT_PUBLIC_INVENTORY_API_URL + `delete/${slug}/`)
            if (!response) {
                toast.error("Failed to delete product")
                return;
            }
            if (response.ok) {
                toast.success("Product deleted successfully")
            }
            else {
                toast.error("Failed to delete product")
            }
        }
        catch (error) {
            console.error(error)
            toast.error("Something went wrong")
        }
        finally {
            await fetchProducts();
        }
    }


    const onProductFormSubmit = async (data: Product) => {
        setLoading(true);
        data.slug = slugify(data.name, {
            lower: true,
        });
        try {
            const response = await authenticatedFetch(router, "POST", process.env.NEXT_PUBLIC_INVENTORY_API_URL + "create", data)
            if (!response) {
                toast.error("Failed to add product")
                return;
            }
            if (!response.ok) {
                toast.error("Failed to add product")
            }
            else {
                toast.success("Product added successfully")
            }
        }
        catch (error) {
            console.error(error)
            toast.error("Something went wrong")
        }
        finally {
            setLoading(false);
            setOpen(false);
            await fetchProducts();
        }
    }

    const onProductFormUpdateSubmit = async (data: Product) => {
        setLoading(true);
        try {
            const response = await authenticatedFetch(router, "PATCH", process.env.NEXT_PUBLIC_INVENTORY_API_URL + `update/${data.slug}/`, data)
            if (!response) {
                toast.error("Failed to update product")
                return;
            }
            if (!response.ok) {
                toast.error("Failed to update product")
            }
            else {
                toast.success("Product updated successfully")
            }
        }
        catch (error) {
            console.error(error)
            toast.error("Something went wrong")
        }
        finally {
            setLoading(false);
            setEditMode(false);
            await fetchProducts();
        }
    }

    const fetchProducts = async () => {
        setDataLoaded(false);
        try {
            const response = await authenticatedFetch(router, "GET", process.env.NEXT_PUBLIC_INVENTORY_API_URL + "list")
            if (!response) {
                toast.error("Failed to fetch products")
                return;
            }
            if (response.ok) {
                const data = await response.json()
                setProducts(data);
            }
            else {
                toast.error("Failed to fetch products")
            }
        }
        catch (error) {
            console.error(error)
            toast.error("Something went wrong")
        }
        finally {
            setDataLoaded(true);
        }
    }

    useEffect(() => {
        const initfetchProducts = async () => {
            setDataLoaded(false);
            try {
                const response = await authenticatedFetch(router, "GET", process.env.NEXT_PUBLIC_INVENTORY_API_URL + "list")
                if (!response) {
                    toast.error("Failed to fetch products")
                    return;
                }
                if (response.ok) {
                    const data = await response.json()
                    setProducts(data);
                }
                else {
                    toast.error("Failed to fetch products")
                }
            }
            catch (error) {
                console.error(error)
                toast.error("Something went wrong")
            }
            finally {
                setDataLoaded(true);
            }
        }

        initfetchProducts();
    }, [router]);

    return (
        <>
            <ProductAddForm open={open} onOpenChange={setOpen} onSubmit={onProductFormSubmit} loading={loading} />
            <ProducUpdateForm open={editMode} onOpenChange={setEditMode} onSubmit={onProductFormUpdateSubmit} initialData={editData} loading={loading} />
            {(dataLoaded && products) ?
                (<DataTable data={products} onAddCommand={onAddCommand} onEditCommand={onEditCommand} onDeleteCommand={onDeleteCommand} />)
                :
                (<DataTableSkeleton />)
            }
        </>

    );
}

export default InventorySection
