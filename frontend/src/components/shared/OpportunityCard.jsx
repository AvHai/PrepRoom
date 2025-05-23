import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from "@/components/ui/card"
import {
  Avatar,
  AvatarFallback
} from "@/components/ui/avatar"
import { format } from "date-fns"
import {
  Calendar,
  MapPin,
  ExternalLink,
  BadgeIndianRupee
} from "lucide-react"
import { Button } from "@/components/ui/button"

const OpportunityShow = ({ opportunity }) => {
  const {
    company,
    companyId,
    role,
    type,
    location,
    stipend,
    applicationDeadline,
    applyLink,
    username,
    eligibility,
    description,
  } = opportunity

  // Format the deadline
  const formattedDeadline = format(new Date(applicationDeadline), "MMM dd, yyyy")

  // Deadline logic
  const deadlineDate = new Date(applicationDeadline)
  const today = new Date()
  const daysUntilDeadline = Math.ceil(
    (deadlineDate - today) / (1000 * 60 * 60 * 24)
  )

  const isDeadlineApproaching = daysUntilDeadline <= 5 && daysUntilDeadline >= 0
  const isDeadlinePassed = daysUntilDeadline < 0

  // Avatar fallback initials
  const getInitials = (name) => {
    if (!name || typeof name !== "string") return "U"
    const parts = name.trim().split(" ")
    return parts[0][0].toUpperCase() + (parts[1]?.[0].toUpperCase() || "")
  }

  // Get company display name - prioritize company.name over companyId
  const getCompanyName = () => {
    if (company?.name) return company.name
    if (companyId) return companyId
    return "Unknown Company"
  }

  return (
    <Card className="relative h-full flex flex-col transition-all duration-300 transform hover:scale-[1.02] 
  hover:shadow-2xl hover:shadow-[#e11d48]/30 
  bg-rose-100 text-black hover:bg-gray-50 
  dark:bg-black dark:text-white dark:hover:bg-gradient-to-br dark:hover:from-black dark:hover:to-[#0f0f0f]"
>
      <CardHeader className="pb-1 pt-1">
        <div className="flex justify-between items-start">
          <div>
            <Badge
              variant="outline"
              className="text-md mb-4 border-primary/40 bg-primary/5 capitalize"
            >
              {getCompanyName()}
            </Badge>
            <h3 className="text-2xl font-semibold leading-tight hover:text-primary transition-colors duration-200">
              {role}
            </h3>
          </div>
          <Badge variant={type === "internship" ? "secondary" : "default"}>
            {type === "internship" ? "Internship" : "Full-time"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pb-2 grow">
        {/* Location */}
        <div className="flex items-center text-md mb-2 capitalize">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{location}</span>
        </div>

        {/* Stipend */}
        {stipend && (
          <div className="flex items-center text-md mb-2">
            <BadgeIndianRupee className="h-4 w-4 mr-1" />
            {type === "internship" ? "Stipend" : "Salary"}:&nbsp;
            <span className="font-medium">{stipend}</span>
          </div>
        )}

        {/* Deadline */}
        <div className="flex items-center text-md mb-2">
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

        {/* Eligibility */}
        {eligibility && (
          <div className="text-sm text-muted-foreground mb-2">
            <span className="font-semibold text-white">Eligibility: </span>
            {eligibility}
          </div>
        )}

        {/* Description */}
        {description && (
          <div className="text-sm text-muted-foreground mb-2">
            <span className="font-semibold text-white">Description: </span>
            {description}
          </div>
        )}
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
            onClick={(e) => e.stopPropagation()}
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

export default OpportunityShow