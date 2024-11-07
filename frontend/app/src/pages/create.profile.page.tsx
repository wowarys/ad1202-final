"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "../hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Textarea } from "../ui/textarea";
import ShadcnDatePicker from "../ui/datepicker";
import { createProfile } from "../api/api";

const formSchema = z.object({
  first_name: z.string().min(2, {
    message: "Имя должно быть не менее 2 символов",
  }),
  last_name: z.string().min(2, {
    message: "Фамилия должна быть не менее 2 символов",
  }),
  birth_date: z.date({
    required_error: "Дата рождения обязательна",
  }),
  bio: z.string().max(1000, {
    message: "Биография должна быть не более 1000 символов",
  }),
});

const CreateProfilePage = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      birth_date: new Date(),
      bio: "",
    },
  });

  const [selectedDate, setSelectedDate] = useState(new Date());

  function onSubmit(values: z.infer<typeof formSchema>) {
    createProfile({ ...values, birth_date: selectedDate })
      .then(() => {
        toast({
          title: "Профиль создан",
          description: "Ваш профиль успешно создан",
        });
        navigate("/profile");
      })
      .catch((error) => {
        console.error("Ошибка при создании профиля", error);
      });
  }

  return (
    <div className="container flex flex-col w-full !py-4">
      <Card>
        <CardHeader>
          <CardTitle>Создание профиля</CardTitle>
          <CardDescription>
            Создайте свой профиль и погрузитесь в мир компьютерных игр
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Имя</FormLabel>
                    <FormControl>
                      <Input placeholder="Введите ваше имя" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Фамилия</FormLabel>
                    <FormControl>
                      <Input placeholder="Введите вашу фамилию" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="birth_date"
                render={() => (
                  <FormItem className="flex flex-col gap-1">
                    <FormLabel>Дата рождения</FormLabel>
                    <ShadcnDatePicker
                      startYear={1930}
                      endYear={2024}
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      placeholder={{ day: "День", month: "Месяц", year: "Год" }}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Биография</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Расскажите о себе" {...field} />
                    </FormControl>
                    <FormDescription>
                      Биография должна быть не более 1000 символов.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Создать</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateProfilePage;
