"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroupTextarea } from "@/components/ui/input-group";

import {
  createProductSchema,
  type CreateProductSchema,
} from "../schemas/create-product";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { uploadFiles } from "../lib/upload";

export function ProductForm() {
  const [files, setFiles] = React.useState<File[]>([]);
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const form = useForm<CreateProductSchema>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      media: [],
    },
  });

  const createProduct = useMutation(
    trpc.products.create.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.products.list.queryFilter());

        toast.success("Product created successfully.");

        form.reset();
        setFiles([]);
      },

      onError: (error) => {
        toast.error(error.message);
      },
    }),
  );

  async function onSubmit(data: CreateProductSchema) {

    let media: {
      key: string;
      type: "IMAGE" | "VIDEO";
    }[] = [];

    if (files.length > 0) {
      media = await uploadFiles(files);
    }

    await createProduct.mutateAsync({
      ...data,
      media,
    });
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Create Product</CardTitle>
        <CardDescription>Add a new product to your store...</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="product-name">Product Name</FieldLabel>
                  <Input
                    {...field}
                    id="product-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="MacBook Pro M4"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="product-description">
                    Description
                  </FieldLabel>
                  <InputGroupTextarea
                    {...field}
                    id="product-description"
                    placeholder="Poweful laptop for developers..."
                    rows={6}
                    className="min-h-24 resize-none"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="price"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="product-price">Product Price</FieldLabel>
                  <Input
                    id="product-price"
                    type="number"
                    min={1}
                    placeholder="1299"
                    value={field.value}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Field>
              <FieldLabel htmlFor="product-media">Product Media</FieldLabel>

              <Input
                id="product-media"
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={(e) => {
                  setFiles(Array.from(e.target.files ?? []));
                }}
              />
              {files.length > 0 && (
                <div className="space-y-1">
                  {files.map((file) => (
                    <p
                      key={`${file.name}-${file.lastModified}`}
                      className="text-sm text-muted-foreground"
                    >
                      {file.name}a
                    </p>
                  ))}
                </div>
              )}

              <FieldDescription>
                Upload one or more product images or videos.
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button
            type="submit"
            form="form-rhf-demo"
            disabled={createProduct.isPending}
          >
            {createProduct.isPending ? "Creating Product..." : "Create Product"}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
