import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { format } from "date-fns"
import { Calendar, Star } from "lucide-react"
import { Link } from "react-router-dom"

const getDifficultyColor = level => {
  switch (level) {
    case "easy":
      return "bg-green-500/10 text-green-500 border-green-500/30"
    case "medium":
      return "bg-yellow-500/10 text-yellow-500 border-yellow-500/30"
    case "hard":
      return "bg-red-500/10 text-red-500 border-red-500/30"
    default:
      return "bg-primary/10 text-primary border-primary/30"
  }
}

const InterviewCard = ({ interview }) => {
  const {
    id,
    company,
    role,
    date,
    difficultyLevel,
    tags,
    author,
    title
  } = interview

  const difficultyColor = getDifficultyColor(difficultyLevel)
  const formattedDate = format(new Date(date), "MMM dd, yyyy")

  // Get initials for avatar fallback
  const getInitials = name => {
    return name
      .split(" ")
      .map(part => part.charAt(0))
      .join("")
      .toUpperCase()
  }

  return (
    <Link to={`/interviews/${id}`}>
      <Card className="card-glow h-full flex flex-col hover:shadow-md transition-shadow duration-300">
        <CardHeader className="pb-3 pt-4">
          <div className="flex justify-between items-start">
            <div>
              <Badge
                variant="outline"
                className="mb-2 border-primary/40 bg-primary/5"
              >
                {company.name}
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
            <span>{role.name}</span>
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
          <div className="flex flex-wrap gap-1">
            {tags.slice(0, 2).map(tag => (
              <Badge
                key={tag.id}
                variant="secondary"
                className="text-xs px-1.5"
              >
                {tag.name}
              </Badge>
            ))}
            {tags.length > 2 && (
              <Badge variant="secondary" className="text-xs px-1.5">
                +{tags.length - 2}
              </Badge>
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}

export default InterviewCard
