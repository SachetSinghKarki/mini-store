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
  const [isUploading, setIsUploading] = React.useState(false);

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
        await queryClient.invalidateQueries(
          trpc.products.list.queryFilter()
        );

        toast.success("Product created successfully.");

        form.reset();
        setFiles([]);
      },

      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const selectedFiles = Array.from(event.target.files ?? []);

    console.log("Selected files:", selectedFiles);

    setFiles(selectedFiles);
  }

  async function onSubmit(data: CreateProductSchema) {
    try {
      setIsUploading(true);


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
    } catch (error) {
      console.error("Product creation failed:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to create product"
      );
    } finally {
      setIsUploading(false);
    }
  }

  const isSubmitting =
    isUploading || createProduct.isPending;

  return (
    <Card className="w-full overflow-hidden border-border/60 shadow-lg">
      <CardHeader className="border-b bg-card px-6 py-6 sm:px-8">
        <CardTitle className="text-2xl font-semibold tracking-tight">
          Create Product
        </CardTitle>

        <CardDescription className="text-sm">
          Add a new product to your store. Fill in the details below
          and upload product media.
        </CardDescription>
      </CardHeader>

      <CardContent className="px-6 py-6 sm:px-8">
        <form
          id="form-rhf-demo"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <FieldGroup>
            {/* PRODUCT NAME */}
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="product-name">
                    Product Name
                  </FieldLabel>

                  <Input
                    {...field}
                    id="product-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="MacBook Pro M4"
                    autoComplete="off"
                    className="h-11"
                  />

                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                    />
                  )}
                </Field>
              )}
            />

            {/* DESCRIPTION */}
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="product-description">
                    Description
                  </FieldLabel>

                  <InputGroupTextarea
                    {...field}
                    id="product-description"
                    placeholder="Powerful laptop for developers..."
                    rows={6}
                    className="min-h-32 resize-none"
                    aria-invalid={fieldState.invalid}
                  />

                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                    />
                  )}
                </Field>
              )}
            />

            {/* PRICE */}
            <Controller
              name="price"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="product-price">
                    Product Price
                  </FieldLabel>

                  <Input
                    id="product-price"
                    type="number"
                    min={1}
                    placeholder="1299"
                    value={field.value}
                    onChange={(e) =>
                      field.onChange(
                        Number(e.target.value)
                      )
                    }
                    className="h-11"
                    aria-invalid={fieldState.invalid}
                  />

                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                    />
                  )}
                </Field>
              )}
            />

            {/* MEDIA */}
            <Field>
              <FieldLabel htmlFor="product-media">
                Product Media
              </FieldLabel>

              <div className="rounded-xl border border-dashed bg-muted/20 p-5">
                <Input
                  id="product-media"
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                  className="cursor-pointer"
                />

                {files.length > 0 ? (
                  <div className="mt-4 space-y-3">
                    <p className="text-sm font-medium">
                      {files.length} file
                      {files.length !== 1 ? "s" : ""} selected
                    </p>

                    <div className="space-y-2">
                      {files.map((file) => (
                        <div
                          key={`${file.name}-${file.lastModified}`}
                          className="flex items-center justify-between rounded-lg border bg-background px-3 py-2"
                        >
                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium">
                              {file.name}
                            </p>

                            <p className="text-xs text-muted-foreground">
                              {(
                                file.size /
                                1024 /
                                1024
                              ).toFixed(2)}{" "}
                              MB
                            </p>
                          </div>

                          <span className="ml-3 shrink-0 text-xs text-muted-foreground">
                            {file.type.startsWith("image/")
                              ? "Image"
                              : "Video"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="mt-3 text-sm text-muted-foreground">
                    No files selected yet.
                  </p>
                )}
              </div>

              <FieldDescription>
                Upload one or more product images or videos.
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>

      {/* FOOTER */}
      <CardFooter className="border-t bg-muted/20 px-6 py-5 sm:px-8">
        <div className="flex w-full justify-end">
          <Button
            type="submit"
            form="form-rhf-demo"
            disabled={isSubmitting}
            className="min-w-36"
          >
            {isUploading
              ? "Uploading Media..."
              : createProduct.isPending
                ? "Creating Product..."
                : "Create Product"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}