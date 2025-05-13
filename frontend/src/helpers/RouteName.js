export const RouteIndex = '/'
export const RouteSignIn = '/sign-in'
export const RouteSignUp = '/sign-up'
export const RouteProfile = '/profile'


export const RouteBlog = '/blog'
export const RouteBlogAdd = '/blog/add'
export const RouteBlogEdit = (blogid) =>{
    if(blogid){
        return `/blog/edit/${blogid}`
    }else{
        return '/blog/edit/:blogid'
    }
}

export const RouteInternship = '/internship'
export const RouteInternshipAdd = '/internship/add'
export const RouteInternshipEdit = (internshipid) =>{
    if(internshipid){
        return `/Internship/edit/${internshipid}`
    }else{
        return '/Internship/edit/:Internshipid'
    }
}