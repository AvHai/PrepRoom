import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PenSquare, User } from "lucide-react";
import InterviewCard from "@/components/shared/InterviewCard";
import OpportunityCard from "@/components/shared/OpportunityCard";
import { useSelector } from "react-redux";
import { getEnv } from "@/helpers/getEnv";
import { useFetch } from "@/hooks/use-fetch";
import Loading from "@/components/Loading";
import { useEffect } from "react";
import { RouteProfile } from "@/helpers/RouteName";
import { Link } from "react-router-dom";

// Mock data for user profile
const mockUser = {
  id: "user1",
  name: "Jane Smith",
  email: "jane.smith@example.com",
  bio: "Software Engineer with 2 years of experience. Passionate about web development and sharing knowledge with the community.",
  avatar: undefined,
};

// Mock interview experiences by user
const mockUserInterviews = [
  {
    id: "101",
    title: "My Google Frontend Interview",
    company: {
      id: "google",
      name: "Google",
    },
    role: {
      id: "frontend-developer",
      name: "Frontend Developer",
    },
    date: "2023-11-15",
    difficultyLevel: "hard",
    tags: [
      { id: "javascript", name: "JavaScript" },
      { id: "react", name: "React" },
      { id: "dsa", name: "DSA" },
    ],
    author: {
      id: "user1",
      name: "Jane Smith",
    },
    content: "My Google interview experience was challenging but rewarding...",
  },
  {
    id: "102",
    title: "Microsoft SDE Interview Experience",
    company: {
      id: "microsoft",
      name: "Microsoft",
    },
    role: {
      id: "software-engineer",
      name: "Software Engineer",
    },
    date: "2024-01-20",
    difficultyLevel: "medium",
    tags: [
      { id: "system-design", name: "System Design" },
      { id: "coding", name: "Coding" },
    ],
    author: {
      id: "user1",
      name: "Jane Smith",
    },
    content: "The Microsoft interview process consisted of several rounds...",
  },
];

// Mock opportunities posted by user
const mockUserOpportunities = [
  {
    id: "201",
    company: {
      id: "amazon",
      name: "Amazon",
    },
    role: "Frontend Engineer",
    type: "full-time",
    location: "remote",
    stipend: "₹20,00,000/year",
    applicationDeadline: "2024-05-15",
    applyLink: "https://amazon.jobs",
    eligibility:
      "B.Tech/B.E. in Computer Science or related field with knowledge of React",
    description: "We are looking for a frontend engineer to join our team...",
    author: {
      id: "user1",
      name: "Jane Smith",
    },
    postedOn: "2024-03-01",
  },
];

const MyPage = () => {
  const user = useSelector((state) => state.user);
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

  // Get initials for avatar fallback
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase();
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
            <CardContent className='h-42.5'>
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
                {mockUserInterviews.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {mockUserInterviews.map((interview) => (
                      <InterviewCard key={interview.id} interview={interview} />
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
                {mockUserOpportunities.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                    {mockUserOpportunities.map((opportunity) => (
                      <OpportunityCard className='h-20'
                        key={opportunity.id}
                        opportunity={opportunity}
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
