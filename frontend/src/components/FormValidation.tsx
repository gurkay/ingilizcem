import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

interface FormValidationProps {
  children: React.ReactNode;
  schema: z.ZodSchema;
  onSubmit: (data: any) => void;
  className?: string;
}

export function FormValidation({ children, schema, onSubmit, className = '' }: FormValidationProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={className}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            register,
            error: errors[child.props.name]?.message,
          });
        }
        return child;
      })}
    </form>
  );
} 