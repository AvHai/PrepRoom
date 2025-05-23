import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { format } from "date-fns";
import { Calendar, Star } from "lucide-react";
import { Link } from "react-router-dom";

const getDifficultyColor = (level) => {
  switch (level) {
    case "easy":
      return "bg-green-500/10 text-green-500 border-green-500/30";
    case "medium":
      return "bg-yellow-500/10 text-yellow-500 border-yellow-500/30";
    case "hard":
      return "bg-red-500/10 text-red-500 border-red-500/30";
    default:
      return "bg-primary/10 text-primary border-primary/30";
  }
};

const InterviewCard = ({ interview }) => {
  const {
    _id,
    companyId,
    roleId,
    interviewDate,
    difficultyLevel,
    tags=[],
    author,
    title,
  } = interview;

  const difficultyColor = getDifficultyColor(difficultyLevel);
  const formattedDate = format(new Date(interviewDate), "MMM dd, yyyy");

  // Get initials for avatar fallback
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase();
  };

  return (
    <Link to={`/interviews/${_id}`}>
      <Card className="relative h-full flex flex-col transition-all duration-300 transform hover:scale-[1.02] 
  hover:shadow-2xl hover:shadow-[#e11d48]/30 
  bg-yellow-50 text-black hover:bg-gray-50 
  dark:bg-black dark:text-white dark:hover:bg-gradient-to-br dark:hover:from-black dark:hover:to-[#0f0f0f]">
        <CardHeader className="pb-3 pt-4">
          <div className="flex justify-between items-start">
            <div>
              <Badge
                variant="outline"
                className="mb-2 border-primary/40 bg-primary/5 capitalize"
              >
                {companyId}
              </Badge>
              <h3 className="text-lg font-semibold leading-tight hover:text-primary transition-colors duration-200">
                {title}
              </h3>
            </div>
            <Badge variant="outline" className={`${difficultyColor}`}>
              {difficultyLevel.charAt(0).toUpperCase() +
                difficultyLevel.slice(1)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="flex items-center text-sm text-muted-foreground mb-2">
            <Star className="h-4 w-4 mr-1" />
            <span>{roleId}</span>
          </div>

          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{formattedDate}</span>
          </div>
        </CardContent>
        <CardFooter className="mt-auto pt-4 flex items-center justify-between border-t border-border">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              {author.avatar ? (
                <AvatarImage src={author.avatar} alt={author.name} />
              ) : (
                <AvatarFallback>{getInitials(author.name)}</AvatarFallback>
              )}
            </Avatar>
            <span className="text-sm text-muted-foreground">{author.name}</span>
          </div>
          <div className="flex flex-wrap gap-1 mr-2">
            {tags.length > 0 ? (
              tags.slice(0, 2).map((tag, idx) => (
                <Badge
                  key={idx}
                  variant="secondary"
                  className="text-xs px-1.5"
                >
                  {tag}
                </Badge>
              ))
            ) : (
              <span className="text-xs text-muted-foreground">No tags</span>
            )}
            {tags.length > 2 && (
              <Badge variant="secondary" className="text-xs px-1.5">
                +{tags.length - 2}
              </Badge>
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default InterviewCard;
