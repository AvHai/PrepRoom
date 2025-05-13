import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import usericon from "../assets/avatar.png";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RouteIndex } from "@/helpers/RouteName";
import { getEnv } from "@/helpers/getEnv";
import { showToast } from "@/helpers/showToast";
import { useDispatch, useSelector } from "react-redux";
import { Textarea } from "@/components/ui/textarea";
import { useFetch } from "@/hooks/use-fetch";
import Loading from "@/components/Loading";
import { IoCameraOutline } from "react-icons/io5";
import { setUser } from "@/redux/user/userSlice";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const {
    data:userData,
    loading,
    error,
  } = useFetch(
    user.user._id
      ? `${getEnv("VITE_API_BASE_URL")}/user/get-user/${user.user._id}`: null,
    { method: "get", credentials: "include" }
  );
  const dispatch = useDispatch();
  const formSchema = z.object({
    name: z.string().min(3, "Name must be atleast 3 character long"),
    email: z.string().email(),
    bio: z.string().min(4, "Bio must be atleast 4 character long"),
    //password: z.string(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      bio: "",
      password: "",
    },
  });

  useEffect(() => {
    if (userData && userData.success) {
      form.reset({
        name: userData.user.name,
        email: userData.user.email,
        bio: userData.user.bio || "",
      });
    }
  }, [userData]);

 
async function onSubmit(values) {
    try {
      if (!userData || !userData.user) {
        return showToast("error", "User data is not available.");
      }

      const formData = new FormData();
      // if (file) {
      //   formData.append("file", file);
      // }
      formData.append("data", JSON.stringify(values));
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/user/update-user/${userData.user._id}`,
        {
          method: "put",
          credentials: "include",
          body: formData,
        }
      );

      const data = await response.json();
      if (!response.ok) {
        return showToast("error", data.message || "Failed to update user data.");
      }

      dispatch(setUser(data.user));
      showToast("success", data.message || "User data updated successfully.");
    } catch (error) {
      showToast("error", error.message || "An error occurred while updating.");
    }
  }
  if (loading) return <Loading />;
  return (
    <Card className="max-w-screen-md mx-auto">
      <CardContent>
        <div className="flex justify-center items-center mt-10">
          <Avatar className="w-28 h-28 relative group">
            <AvatarImage src={usericon} />
            <div className="absolute z-50 w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 justify-center items-center bg-black opacity-60 border-2 border-amber-200 rounded-full group-hover:flex hidden cursor-pointer">
              <IoCameraOutline color='#FFD90E'/>
            </div>
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your email address"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter your bio" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter your password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-5">
                <Button type="submit" className="w-full">
                  Save Changes
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
};

export default Profile;
