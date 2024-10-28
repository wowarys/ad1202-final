import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const formSchema = z.object({
    username: z.string().min(6, {
      message: "Имя пользователя должно содержать минимум 6 символов",
    }),
    password: z.string().min(8, {
      message: "Пароль должен содержать минимум 8 символов",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <Card className="w-full max-w-md mx-4 shadow-lg">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center gap-2">
              <LogIn size={20} className="text-purple-600" />
              <CardTitle className="text-2xl font-bold text-center">
                Вход в аккаунт
              </CardTitle>
            </div>
            <CardDescription className="text-center text-gray-500">
              Введите свои данные для входа в аккаунт
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="space-y-1.5">
                      <FormLabel className="text-sm font-medium">
                        Имя пользователя
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Введите имя пользователя"
                          {...field}
                          className="shadow-sm"
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="space-y-1.5">
                      <FormLabel className="text-sm font-medium">
                        Пароль
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Введите пароль"
                            {...field}
                            className="shadow-sm"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-gray-500" />
                            ) : (
                              <Eye className="h-4 w-4 text-gray-500" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <div className="flex flex-col gap-3">
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-500 duration-300 hover:from-purple-700 hover:to-blue-600 transition-all shadow-md hover:shadow-lg hover:scale-[0.99]"
                  >
                    <LogIn className="mr-2" size={16} /> Войти
                  </Button>
                  <div className="text-sm text-center text-gray-500">
                    Нет аккаунта?&nbsp;
                    <Button
                      variant="link"
                      className="px-1 text-purple-600 hover:text-purple-700 transition-colors"
                      onClick={() => {
                        navigate("/sign/up");
                      }}
                    >
                      Зарегистрируйтесь
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;