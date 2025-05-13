
export const getEnv = (envname)=>{
    const env = import.meta.env
    console.log(envname);
    
    return env[envname]
}