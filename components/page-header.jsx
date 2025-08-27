import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";

const PageHeader = ({
  icon,
  title,
  backLink = "/",
  backLabel = "Back to Home",
}) => {
  return (
    <div className="flex flex-col justify-between gap-5 mb-8">
      <Button
        asChild
        variant={"outline"}
        size={"sm"}
        className={"mb-2 border-emerald-900/30 w-fit"}
        aria-label={backLabel}>
        <Link href={backLink}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          {backLabel}
        </Link>
      </Button>

      <div className="flex items-end gap-2">
        {icon && (
          <div className="text-emerald-400">
            {React.isValidElement(icon)
              ? React.cloneElement(icon, {
                  className: "h-12 md:h-14 w-12 md:w-14",
                  "aria-hidden": true,
                })
              : React.createElement(icon, {
                  className: "h-12 md:h-14 w-12 md:w-14",
                  "aria-hidden": true,
                })}
          </div>
        )}
        <h1 className="text-4xl md:text-5xl gradient-title">
          {title}
        </h1>
      </div>
    </div>
  );
};

export default PageHeader;
