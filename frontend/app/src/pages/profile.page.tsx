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
import { getAgeText, getInitials } from "../lib/utils";
import { fetchUserProfile, editProfile } from "../api/api";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: "",
    age: 0,
    bio: "",
    username: "",
    user_id: "",
  });

  const [editProfileData, setEditProfileData] = useState({
    name: "",
    age: 0,
    bio: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      fetchUserProfile(token).then((data) => {
        setProfile(data);
        setEditProfileData({ name: data.name, age: data.age, bio: data.bio });
      });
    }
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = (e: { target: { id: any; value: any } }) => {
    const { id, value } = e.target;
    setEditProfileData((prevData) => ({
      ...prevData,
      [id]: id === "age" ? Math.max(0, Number(value)) : value,
    }));
  };

  const handleProfileUpdate = async () => {
    try {
      await editProfile(editProfileData);
      setProfile((prevProfile) => ({
        ...prevProfile,
        ...editProfileData,
      }));
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  return (
    <div className="container max-w-4xl !py-8">
      <Card className="w-full bg-white shadow-lg">
        <CardHeader className="relative pb-8">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-purple-600 to-blue-500 rounded-t-lg" />
          <div className="relative flex flex-col items-center">
            <Avatar className="h-32 w-32 border-4 border-white shadow-xl mb-4 mt-16">
              <AvatarFallback className="bg-gradient-to-br from-purple-600 to-blue-500 text-3xl font-medium text-white">
                {getInitials(profile.name ? profile.name : profile.user_id)}
              </AvatarFallback>
            </Avatar>
            <CardTitle className="text-2xl font-bold mb-2">
              {profile.name || "Имя не указано"}
            </CardTitle>
            <CardDescription className="text-gray-600 mb-4">
              @{profile.user_id}
            </CardDescription>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="gap-2 items-center flex flex-row"
                >
                  <Pencil className="h-4 w-4" />
                  Редактировать профиль
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Редактировать профиль</DialogTitle>
                  <DialogDescription>Измените информацию</DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="username">Имя пользователя</Label>
                    <Input id="username" disabled value={profile.user_id} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="age">Возраст</Label>
                    <Input
                      id="age"
                      value={editProfileData.age}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="name">Имя</Label>
                    <Input
                      id="name"
                      value={editProfileData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="bio">О себе</Label>
                    <Textarea
                      id="bio"
                      value={editProfileData.bio}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" onClick={handleProfileUpdate}>
                    Применить
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
                {profile.bio || "Информация о себе не указана"}
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                  <Calendar className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Возраст</p>
                  <p className="font-medium">
                    {profile.age ? getAgeText(profile.age) : "Не указан"}
                  </p>
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
