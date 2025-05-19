import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PenSquare, User } from "lucide-react";
import InterviewProfileCard from "@/components/shared/InterviewProfileCard";
import OpportunityProfileCard from "@/components/shared/OpportunityProfileCard";
import { useSelector } from "react-redux";
import { getEnv } from "@/helpers/getEnv";
import { useFetch } from "@/hooks/use-fetch";
import Loading from "@/components/Loading";
import { useEffect, useState } from "react";
import { RouteProfile } from "@/helpers/RouteName";
import { Link } from "react-router-dom";

const MyPage = () => {
  const user = useSelector((state) => state.user);
  const [interviews, setInterviews] = useState([]);
  const [opportunities, setOpportunities] = useState([]);
  const {
    data: userData,
    loading,
    error,
  } = useFetch(
    user.user._id
      ? `${getEnv("VITE_API_BASE_URL")}/user/get-user/${user.user._id}`
      : null,
    { method: "get", credentials: "include" }
  );
  useEffect(() => {}, [userData]);

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase();
  };

  // useEffect(() => {
  //   fetch(`${import.meta.env.VITE_API_BASE_URL}/interviews/`, {
  //     credentials: 'include',
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       setInterviews(data);
  //     })
  //     .catch(err => {
  //       console.error('Failed to fetch interviews:', err);
  //     });
  // }, []);

  //   useEffect(() => {
  //   fetch(`${import.meta.env.VITE_API_BASE_URL}/opportunity/`, {
  //     credentials: 'include',
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       setOpportunities(data);
  //     })
  //     .catch(err => {
  //       console.error('Failed to fetch opportunities:', err);
  //     });
  // }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/interviews/`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        const myInterviews = data.filter(
          (interview) => interview.author._id === user.user.id
        );
        setInterviews(myInterviews);
      })
      .catch((err) => {
        console.error("Failed to fetch interviews:", err);
      });
  }, [user.user._id]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/opportunity/`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        const myOpportunities = data.filter(
          (opportunity) => opportunity.userId._id === user.user._id
        );
        setOpportunities(myOpportunities);
      })
      .catch((err) => {
        console.error("Failed to fetch opportunities:", err);
      });
  }, [user.user._id]);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/interviews/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!res.ok) throw new Error("Failed to delete interview");

      // Update local state after deletion
      const updatedInterviews = interviews.filter(
        (interview) => interview._id !== id
      );
      setInterviews(updatedInterviews);
      filterAndSearch(filters, searchQuery); // reapply filters to updated list
    } catch (err) {
      console.error("Error deleting interview:", err);
    }
  };
  const handleDeleteOp = async (id) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/opportunity/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!res.ok) throw new Error("Failed to delete opportunity");

      // Update local state after deletion
      const updatedOp = opportunities.filter(
        (opportunity) => opportunity._id !== id
      );
      setOpportunities(updatedOp);
      filterAndSearch(filters, searchQuery); // reapply filters to updated list
    } catch (err) {
      console.error("Error deleting opportunity:", err);
    }
  };

  if (loading) return <Loading />;
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Profile</h1>
        <p className="text-muted-foreground">
          Manage your posts and account settings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* User profile sidebar */}
        <div className="col-span-1">
          <Card className="card-glow">
            <CardHeader className="text-center">
              <Avatar className="w-24 h-24 mx-auto">
                {user.avatar ? (
                  <AvatarImage src={user.avatar} alt={user.name} />
                ) : (
                  <AvatarFallback>
                    {userData && userData.user
                      ? getInitials(userData.user.name)
                      : "?"}
                  </AvatarFallback>
                )}
              </Avatar>
              <CardTitle className=" text-2xl mt-4">
                {" "}
                {userData && userData.user ? userData.user.name : "Loading..."}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {" "}
                {userData && userData.user ? userData.user.email : "Loading..."}
              </p>
            </CardHeader>
            <CardContent className="h-42.5">
              <p className="text-2xl mb-8">
                {userData && userData.user ? userData.user.bio : "Loading..."}
              </p>
              <div className="flex flex-col gap-4">
                <Link
                  to={RouteProfile}
                  className="w-full flex items-center gap-4 px-4 py-2 border rounded-md text-sm font-medium text-foreground hover:bg-accent"
                >
                  <User size={20} />
                  Edit Profile
                </Link>
                <Link
                  to="/submit"
                  className="w-full flex items-center gap-4 px-4 py-2 bg-primary text-white rounded-md text-sm font-medium hover:bg-primary/90"
                >
                  <PenSquare size={20} />
                  Create a post
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* User content tabs */}
        <div className="col-span-1 lg:col-span-3">
          <Tabs defaultValue="interviews" className="w-full">
            <TabsList className="grid grid-cols-2 mb-6 w-full">
              <TabsTrigger value="interviews">My Interviews</TabsTrigger>
              <TabsTrigger value="opportunities">My Opportunities</TabsTrigger>
            </TabsList>

            <TabsContent value="interviews">
              <div>
                <h2 className="text-xl font-medium mb-4">
                  Your Interview Experiences
                </h2>
                {interviews.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {interviews.map((interview) => (
                      <InterviewProfileCard
                        key={interview.id}
                        interview={interview}
                        onDelete={handleDelete}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-lg font-medium mb-2">
                      No interviews posted yet
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Share your interview experiences to help others
                    </p>
                    <Button>Share Interview Experience</Button>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="opportunities">
              <div>
                <h2 className="text-sm font-medium mb-4">
                  Job Opportunities You've Posted
                </h2>
                {opportunities.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                    {opportunities.map((opportunity) => (
                      <OpportunityProfileCard
                        className="h-20"
                        key={opportunity.id}
                        opportunity={opportunity}
                        onDelete={handleDeleteOp}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-lg font-medium mb-2">
                      No opportunities posted yet
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Help others by sharing job opportunities
                    </p>
                    <Button>Post a Job Opportunity</Button>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
