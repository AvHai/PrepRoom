import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft } from "lucide-react"
import { RouteInterview } from "@/helpers/RouteName"
import LikeCount from "@/components/LikeCount"

export default function InterviewDetails() {
  const { id, author } = useParams()
  const [interview, setInterview] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  
  

  useEffect(() => {
    if (!id) return
    
    // Fix template literal syntax with proper backticks
    fetch(`${import.meta.env.VITE_API_BASE_URL}/interviews/${id}`, {
      credentials: "include"
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        //console.log("Fetched interview data:", data);
        setInterview(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch interview:", err)
      })
  }, [id])

  const getDifficultyColor = level => {
    switch (level?.toLowerCase()) {
      case "easy":
        return "bg-green-600 hover:bg-green-700"
      case "medium":
        return "bg-yellow-600 hover:bg-yellow-700"
      case "hard":
        return "bg-red-600 text-white hover:bg-red-500"
      default:
        return "bg-secondary hover:bg-secondary/80"
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <p className="text-muted-foreground">Loading interview details...</p>
      </div>
    )
  }

  if (!interview) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-4">
        <h2 className="text-2xl font-bold">Interview not found</h2>
        <Button variant="outline" asChild>
          <Link to="/interviews">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all interviews
          </Link>
        </Button>
      </div>
    )
  }

  // Format dates once for reuse
  const formattedInterviewDate = interview.interviewDate 
    ? new Date(interview.interviewDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      })
    : null;
    
  const formattedCreatedDate = interview.createdAt ? new Date(interview.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  }) : "Unknown";

  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <div className="mb-6">
        <Button variant="ghost" asChild className="group">
          <Link to={RouteInterview} className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition" />
            Back to all interviews
          </Link>
        </Button>
      </div>

      <Card className="border-border shadow-lg bg-card">
        <CardHeader>
          <div className="flex justify-between items-start mb-4">
            {interview.difficultyLevel && (
              <Badge
                // Fix template literal syntax with proper backticks
                className={`${getDifficultyColor(
                  interview.difficultyLevel
                )} px-3 py-1 capitalize`}
              >
                {interview.difficultyLevel}
              </Badge>
            )}
            {formattedInterviewDate && (
              <span className="text-sm text-muted-foreground">
                <LikeCount interviewid={interview._id} />
              </span>
            )}
          </div>

          <CardTitle className="text-3xl">{interview.title}</CardTitle>
          <CardDescription className="text-xl mt-2 capitalize">
            {interview.companyId} • {interview.roleId}
          </CardDescription>

          <div className="flex items-center mt-4 space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary/20 text-primary">
                {interview.author.name?.[0]?.toUpperCase() || "A"}
              </AvatarFallback>
            </Avatar>
            <span className="text-muted-foreground">
              Author ID: {interview.author?.name}
            </span>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-primary/5 rounded-lg">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Interview ID</h3>
              <p className="text-sm font-mono">{interview._id || id}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Company</h3>
              <p className="capitalize">{interview.companyId}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Role</h3>
              <p className="capitalize">{interview.roleId}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Difficulty</h3>
              <p className="capitalize">{interview.difficultyLevel}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Interview Date</h3>
              <p>{formattedInterviewDate || "Not specified"}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Created</h3>
              <p>{formattedCreatedDate}</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <h3 className="text-sm font-medium text-muted-foreground w-full mb-1">Tags</h3>
            {interview.tags?.length > 0 ? (
              interview.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))
            ) : (
              <span className="text-sm text-muted-foreground">No tags</span>
            )}
          </div>

          <Separator className="my-4" />

          <div className="prose prose-invert max-w-none prose-headings:text-primary prose-a:text-blue-400">
            <h3 className="text-lg font-medium mb-2">Experience</h3>
            <p className="whitespace-pre-wrap">{interview.experience}</p>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between pt-4 border-t border-border text-sm text-muted-foreground">
          <div>
            Created: {formattedCreatedDate}
          </div>
          {interview.updatedAt && interview.updatedAt !== interview.createdAt && (
            <div>
              Updated: {new Date(interview.updatedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric"
              })}
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}