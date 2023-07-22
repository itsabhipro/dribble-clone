import Image from "next/image";
import { type } from "os"
import { MouseEventHandler } from "react";

type ButtonProps = {
    title:string;
    type:'button'|'submit';
    leftIcon?:string|null;
    rightIcon?:string|null;
    handleClick?: MouseEventHandler;
    isSubmitting?:boolean;
    bgColor?:string;
    textColor?:string;

}
function Button({title, type, leftIcon, rightIcon, handleClick, bgColor, textColor, isSubmitting}:ButtonProps) {
  return (
    <button type={type} disabled={isSubmitting} className={`flexCenter gap-3 px-4 py-3 ${textColor ? textColor:'text-white'} ${isSubmitting ? 'bg-black/50':bgColor ? bgColor: 'bg-primary-purple'} rounded-xl text-sm font-medium max-md:w-full`} onClick={handleClick}>
        {leftIcon && <Image src={leftIcon} width={14} height={14} alt="left icon"/>}
        {title}
        {rightIcon && <Image src={rightIcon} width={14} height={14} alt="right icon"/>}
    </button>
  )
}

export default Button