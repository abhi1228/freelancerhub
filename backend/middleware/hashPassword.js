import bcrypt from "bcrypt";

export const hashPassword=async(password)=>{

    const hashPassword=await bcrypt.hash(password,5);

    return hashPassword;
}

export const verifyPassword=async(userPassword,savedPassword)=>{
    console.log('pass:',userPassword,"savedPass:",savedPassword);
    const verify=await bcrypt.compare(userPassword,savedPassword);
    

    return verify;
}