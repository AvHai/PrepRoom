import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { format } from "date-fns"
import { Calendar, MapPin, ExternalLink, BadgeIndianRupee, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { showToast } from "@/helpers/showToast"

const OpportunityProfileCard = ({ opportunity, onDelete }) => {
  const {
    companyId,
    role,
    type,
    location,
    stipend,
    applicationDeadline,
    applyLink,
    username,
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

  const handleEdit = e => {
    e.stopPropagation()
    // Your edit logic here, e.g., open modal or redirect
    showToast('info', "Coming Soon")
  }

  return (
    <Card className="relative bg-black text-white card-glow h-full flex flex-col transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-amber-500/10 hover:bg-gradient-to-br hover:from-black hover:to-[#0f0f0f]">
      <CardHeader className="pb-3 pt-4 ">
        <div className="flex justify-between items-start">
          <div>
            <Badge
              variant="outline"
              className="text-md mb-4 border-primary/40 bg-primary/5 capitalize"
            >
              {companyId}
            </Badge>
            <h3 className="text-2xl font-semibold leading-tight hover:text-primary transition-colors duration-200">
              {role}
            </h3>
          </div>

          {/* Right side badge + edit button container */}
          <div className="flex items-center gap-3">
            <Badge variant={type === "internship" ? "secondary" : "default"}>
              {type === "internship" ? "Internship" : "Full-time"}
            </Badge>
            <button
              onClick={handleEdit}
              aria-label="Edit opportunity"
              className="flex items-center gap-1 text-sm text-[#E6253F] hover:text-[#FF4D5A] font-semibold transition-colors"
            >
              <Edit size={16} />
              Edit
            </button>
            <Button
            size="icon"
            variant="ghost"
            className="h-7 w-7"
            onClick={() => onDelete(opportunity._id)}
          >
            <Trash2 size={14} className="text-red-500" />
          </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2 grow">
        <div className="flex items-center text-md mb-2 capitalize">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{location}</span>
        </div>

        {stipend && (
          <div className=" flex items-center text-md mb-2">
            <BadgeIndianRupee className="h-4 w-4 mr-1" />
            {type === "internship" ? " Stipend" : " Salary "}:{"  "}
            <span className="font-medium">&nbsp;{stipend} </span>
          </div>
        )}

        <div className="flex items-center text-md ">
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
          <Avatar className="h-8 w-8">
              <AvatarFallback>{getInitials(username)}</AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">
            Posted by {username}
          </span>
        </div>

        <div className="w-full">
          <a
            href={applyLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleApply}
            className={`w-full ${isDeadlinePassed ? "pointer-events-none" : ""}`}
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

export default OpportunityProfileCard