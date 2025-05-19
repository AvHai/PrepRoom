import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { format, isValid } from "date-fns";
import { Calendar, Star, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";


// Optional mappings for better display names
const companies = {
  google: "Google",
  amazon: "Amazon",
  // add other company mappings here
};

const roles = {
  "software-engineer": "Software Engineer",
  "data-scientist": "Data Scientist",
  // add other role mappings here
};

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

const InterviewProfileCard = ({ interview, onEdit, onDelete }) => {
  // Using _id as id, and destructure other fields
  const {
    _id: id,
    companyId,
    roleId,
    interviewDate,
    difficultyLevel,
    tags = [],
    author,
    title,
  } = interview;

  const formattedDate = isValid(new Date(interviewDate))
    ? format(new Date(interviewDate), "MMM dd, yyyy")
    : "Unknown Date";

  const navigate = useNavigate();

  const getInitials = (name) =>
    name
      ?.split(" ")
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase();

  const difficultyColor = getDifficultyColor(difficultyLevel);

  return (
    <Card className="relative bg-black text-white card-glow h-full flex flex-col transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-amber-500/10 hover:bg-gradient-to-br hover:from-black hover:to-[#0f0f0f]">
      <CardHeader className="pb-2 pt-3 px-4">
        <div className="flex justify-between items-start">
          <div>
            <Badge
              variant="outline"
              className="mb-2 border-primary/40 bg-primary/5"
            >
              {companies[companyId] ?? companyId ?? "Unknown Company"}
            </Badge>
            <h3
              onClick={() => navigate(`/interviews/${id}`)}
              className="text-lg font-semibold leading-tight hover:text-primary transition-colors duration-200 cursor-pointer"
            >
              {title ?? "Untitled Interview"}
            </h3>
          </div>
          <Badge variant="outline" className={`${difficultyColor}`}>
            {difficultyLevel
              ? difficultyLevel.charAt(0).toUpperCase() + difficultyLevel.slice(1)
              : "Unknown"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pb-0 px-2">
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <Star className="h-4 w-4 mr-1" />
          <span>{roles[roleId] ?? roleId ?? "Unknown Role"}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 mr-1" />
          <span>{formattedDate}</span>
        </div>
      </CardContent>

      <CardFooter className="mt-auto pt-3 px-4 pb-3 flex items-center justify-between border-t border-border">
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            {author?.avatar ? (
              <AvatarImage src={author.avatar} alt={author?.name ?? "User"} />
            ) : (
              <AvatarFallback>{getInitials(author?.name ?? "U")}</AvatarFallback>
            )}
          </Avatar>
          <span className="text-sm text-muted-foreground">
            {author?.name ?? "Unknown Author"}
          </span>
        </div>

        <div className="flex gap-2 items-center">
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

          <Button
            size="icon"
            variant="ghost"
            className="h-7 w-7"
            onClick={() => onEdit?.(id)}
          >
            <Pencil size={14} />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="h-7 w-7"
            onClick={() => onDelete(interview._id)}
          >
            <Trash2 size={14} className="text-red-500" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default InterviewProfileCard;