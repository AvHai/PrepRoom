import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { format } from "date-fns"
import { Calendar, MapPin, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

const OpportunityCard = ({ opportunity }) => {
  const {
    id,
    company,
    role,
    type,
    location,
    stipend,
    applicationDeadline,
    applyLink,
    author
  } = opportunity

  // Format dates
  const formattedDeadline = format(
    new Date(applicationDeadline),
    "MMM dd, yyyy"
  )

  // Calculate if deadline is approaching (within 5 days)
  const deadlineDate = new Date(applicationDeadline)
  const today = new Date()
  const daysUntilDeadline = Math.ceil(
    (deadlineDate.getTime() - today.getTime()) / (1000 * 3600 * 24)
  )
  const isDeadlineApproaching = daysUntilDeadline <= 5 && daysUntilDeadline >= 0
  const isDeadlinePassed = daysUntilDeadline < 0

  // Get initials for avatar fallback
  const getInitials = name => {
    return name
      .split(" ")
      .map(part => part.charAt(0))
      .join("")
      .toUpperCase()
  }

  const handleApply = e => {
    e.stopPropagation()
  }

  return (
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
              {role}
            </h3>
          </div>
          <Badge variant={type === "internship" ? "secondary" : "default"}>
            {type === "internship" ? "Internship" : "Full-time"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2 grow">
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{location}</span>
        </div>

        {stipend && (
          <div className="text-sm mb-2">
            {type === "internship" ? "Stipend" : "Salary"}:{" "}
            <span className="font-medium">{stipend}</span>
          </div>
        )}

        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 mr-1" />
          <span>
            Deadline: {formattedDeadline}
            {isDeadlineApproaching && !isDeadlinePassed && (
              <Badge variant="destructive" className="ml-2 text-xs">
                Closing Soon
              </Badge>
            )}
            {isDeadlinePassed && (
              <Badge variant="outline" className="ml-2 text-xs bg-muted/30">
                Closed
              </Badge>
            )}
          </span>
        </div>
      </CardContent>
      <CardFooter className="pt-4 flex-col gap-3 border-t border-border">
        <div className="flex items-center gap-2 w-full">
          <Avatar className="h-6 w-6">
            {author.avatar ? (
              <AvatarImage src={author.avatar} alt={author.name} />
            ) : (
              <AvatarFallback>{getInitials(author.name)}</AvatarFallback>
            )}
          </Avatar>
          <span className="text-sm text-muted-foreground">
            Posted by {author.name}
          </span>
        </div>

        <div className="w-full">
          <a
            href={applyLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleApply}
            className={`w-full ${
              isDeadlinePassed ? "pointer-events-none" : ""
            }`}
          >
            <Button
              variant="outline"
              className="w-full gap-2"
              disabled={isDeadlinePassed}
            >
              <ExternalLink size={14} />
              {isDeadlinePassed ? "Application Closed" : "Apply Now"}
            </Button>
          </a>
        </div>
      </CardFooter>
    </Card>
  )
}

export default OpportunityCard
