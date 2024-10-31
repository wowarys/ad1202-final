import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Pencil, Calendar, User2 } from "lucide-react";
import { Button } from "../ui/button";
import { getInitials } from "../lib/utils";
import { fetchUserProfile } from "../api/api";

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: "",
    age: 0,
    bio: "",
    username: "",
    user_id: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      fetchUserProfile(token).then((data) => {
        setProfile(data);
      });
    }
  }, []);

  return (
    <div className="container max-w-4xl !py-8">
      <Card className="w-full bg-white shadow-lg">
        <CardHeader className="relative pb-8">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-purple-600 to-blue-500 rounded-t-lg" />
          <div className="relative flex flex-col items-center">
            <Avatar className="h-32 w-32 border-4 border-white shadow-xl mb-4 mt-16">
              <AvatarFallback className="bg-gradient-to-br from-purple-600 to-blue-500 text-3xl font-medium text-white">
                {getInitials(profile.name || profile.username)}
              </AvatarFallback>
            </Avatar>
            <CardTitle className="text-2xl font-bold mb-2">
              {profile.name || "Имя не указано"}
            </CardTitle>
            <CardDescription className="text-gray-600 mb-4">
              @{profile.user_id}
            </CardDescription>
            <Button variant="outline" className="gap-2">
              <Pencil className="h-4 w-4" />
              Редактировать профиль
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                  <User2 className="h-5 w-5 text-green-600" />
                </div>
                <p className="text-sm text-gray-500">О себе</p>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {profile.bio || "Биография пока не заполнена"}
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                  <Calendar className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Возраст</p>
                  <p className="font-medium">{profile.age || "Не указан"}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
