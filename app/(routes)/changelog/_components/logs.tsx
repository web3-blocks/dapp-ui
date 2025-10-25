"use client";

import * as React from "react";
import { Content } from "@wisp-cms/client";
import { RiExchange2Line } from "react-icons/ri";
import { ArrowUpRightIcon } from "lucide-react";

import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineImage,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/components/ui/timeline";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import { wispConfig } from "@/config/wisp.config";
import { Wrapper } from "@/components/shared/wrapper";
import { errorHandler, formatDateString, getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Logs = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [changelogs, setChangelogs] = React.useState<Content[]>();

  React.useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);

        const logs = await wispConfig.getContents({
          contentTypeSlug: "changelog",
          limit: "all",
        });

        setChangelogs(logs.contents);
        console.log(logs.contents);
      } catch (error) {
        const err = errorHandler(error, "Error fetching changelogs");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <Wrapper className="border-dashed md:border-x">
      <Wrapper
        size="sm"
        className="flex flex-col gap-16 px-0! py-16 md:gap-32 md:py-32"
      >
        <div className="flex max-w-lg flex-col gap-4 text-start">
          <h2 className="text-3xl font-bold text-balance md:text-4xl">
            Changelog
          </h2>
          <p className="text-muted-foreground">
            Stay updated with the latest features, improvements, and fixes
            through our detailed changelog.
          </p>
        </div>

        <Timeline>
          {isLoading ? (
            <p>Please wait...</p>
          ) : changelogs && changelogs?.length ? (
            changelogs
              ?.slice()
              .sort(
                (a, b) =>
                  new Date(String(b.content.publishedAt)).getTime() -
                  new Date(String(a.content.publishedAt)).getTime()
              )
              .map((item, index) => (
                <TimelineItem
                  key={item.id ?? index}
                  step={changelogs.length}
                  className="sm:group-data-[orientation=vertical]/timeline:ms-32"
                >
                  <TimelineHeader>
                    <TimelineSeparator className="ml-2 group-data-[orientation=vertical]/timeline:-left-7 group-data-[orientation=vertical]/timeline:h-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=vertical]/timeline:translate-y-6.5 sm:ml-0" />
                    <TimelineDate className="mt-1 sm:group-data-[orientation=vertical]/timeline:absolute sm:group-data-[orientation=vertical]/timeline:-left-32 sm:group-data-[orientation=vertical]/timeline:w-20 sm:group-data-[orientation=vertical]/timeline:text-right">
                      {formatDateString(item.createdAt)}
                    </TimelineDate>
                    <TimelineTitle className="mt-0.5">
                      {item.author.name}{" "}
                      <span className="text-muted-foreground text-sm font-normal">
                        {String(item.content.action)}
                      </span>
                    </TimelineTitle>
                    <TimelineIndicator className="bg-primary/10 group-data-completed/timeline-item:bg-primary group-data-completed/timeline-item:text-primary-foreground ml-2 flex size-6 items-center justify-center border-none group-data-[orientation=vertical]/timeline:-left-7 sm:ml-0">
                      <Avatar>
                        <AvatarImage
                          src={item.author.image as string}
                          alt={item.author.name as string}
                        />
                        <AvatarFallback>
                          {getInitials(item.author.name as string)}
                        </AvatarFallback>
                      </Avatar>
                    </TimelineIndicator>
                  </TimelineHeader>
                  <TimelineContent className="mt-2 sm:rounded-lg sm:border sm:px-4 sm:py-3">
                    <p className="text-foreground mb-1 text-sm font-semibold sm:text-base">
                      {String(item.content.title)}
                    </p>
                    <span>{String(item.content.description)}</span>
                  </TimelineContent>
                  {typeof item.content.preview === "string" && (
                    <TimelineImage
                      src={item.content.preview}
                      alt={String(item.content.title)}
                    />
                  )}
                </TimelineItem>
              ))
          ) : (
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <RiExchange2Line />
                </EmptyMedia>
                <EmptyTitle>No changelogs yet</EmptyTitle>
                <EmptyDescription>
                  There are no changelogs available at the moment. Please check
                  back later for updates.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <div className="flex gap-2">
                  <Button>Templates</Button>
                  <Button variant="outline">Contribute</Button>
                </div>
              </EmptyContent>
              <Button
                variant="link"
                asChild
                className="text-muted-foreground"
                size="sm"
              >
                <a href="#">
                  Learn More <ArrowUpRightIcon />
                </a>
              </Button>
            </Empty>
          )}
        </Timeline>
      </Wrapper>
    </Wrapper>
  );
};
