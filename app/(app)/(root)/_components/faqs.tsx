"use client"

import { faqItems } from "@/constants"

import { Wrapper } from "@/components/shared/wrapper"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/new-york/ui/accordion"

export const FAQs = () => {
  return (
    <section className="border-b border-dashed">
      <Wrapper className="border-dashed md:border-x">
        <Wrapper size="sm" className="px-0! py-16 md:py-32">
          <div className="relative">
            <div className="mx-auto max-w-xl text-center">
              <h2 className="text-3xl font-bold text-balance md:text-4xl">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground mt-4 text-balance">
                Discover quick and comprehensive answers to common questions
                about our platform, services, and features.
              </p>
            </div>

            <div className="mx-auto mt-12 max-w-xl">
              <Accordion
                type="single"
                collapsible
                defaultValue="item-1"
                className="bg-background w-full rounded-[20px] border p-1 shadow-sm"
              >
                {faqItems.map((item, index) => (
                  <div className="group" key={index}>
                    <AccordionItem
                      value={`item-${index + 1}`}
                      className="data-[state=open]:bg-secondary/80 dark:data-[state=open]:bg-secondary/30 peer rounded-xl border-none px-4 py-1 data-[state=open]:border-none data-[state=open]:shadow-none sm:px-5 md:px-7"
                    >
                      <AccordionTrigger
                        role="button"
                        className="text-sm hover:no-underline sm:text-base"
                      >
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="dark:text-muted-foreground text-sm">
                          {item.answer}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    <hr className="mx-7 border-dashed group-last:hidden peer-data-[state=open]:opacity-0" />
                  </div>
                ))}
              </Accordion>
            </div>
          </div>
        </Wrapper>
      </Wrapper>
    </section>
  )
}
