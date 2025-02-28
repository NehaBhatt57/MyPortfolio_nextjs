import Column from "@/components/core/Column";
import ConstraintedBox from "@/components/core/ConstraintedBox";
import ResponsiveBox from "@/components/core/ResponsiveBox";
import { TypewriterEffectSmooth } from "@/components/common/TypewriterEffect";
import HeroButtons from "./ui/HeroButtons";
import HeroSocialIcons from "./ui/HeroSocialIcons";

const HomeSection1 = ({ id }: Readonly<{ id: string }>) => {
  const text_1 = [
    {
      text: "Hi",
      classname:
        "text-2xl/normal sm:text-3xl/normal md:text-5xl/normal lg:text-6xl/normal xl:text-7xl/normal dark:text-[var(--textColor)] text-[var(--textColor)]",
    },
    {
      text: "there,",
      classname:
        "text-2xl/normal sm:text-3xl/normal md:text-5xl/normal lg:text-6xl/normal xl:text-7xl/normal dark:text-[var(--textColor)] text-[var(--textColor)]",
    },
    {
      text: "I",
      classname:
        "text-2xl/normal sm:text-3xl/normal md:text-5xl/normal lg:text-6xl/normal xl:text-7xl/normal dark:text-[var(--textColor)] text-[var(--textColor)]",
    },
    {
      text: "am",
      classname:
        "text-2xl/normal sm:text-3xl/normal md:text-5xl/normal lg:text-6xl/normal xl:text-7xl/normal dark:text-[var(--textColor)] text-[var(--textColor)]",
    },
    {
      text: "Neha",
      className:
        "text-2xl/normal sm:text-3xl/normal md:text-5xl/normal lg:text-6xl/normal xl:text-7xl/normal dark:text-[var(--primaryColor)] text-[var(--primaryColor)]",
    },
    {
      text: "Bhatt",
      className:
        "text-2xl/normal sm:text-3xl/normal md:text-5xl/normal lg:text-6xl/normal xl:text-7xl/normal dark:text-[var(--primaryColor)] text-[var(--primaryColor)]",
    },
  ];

  const text_2 = [
    {
      text: "Graphic",
      className:
        "text-xs/normal sm:text-sm/normal md:text-base/normal font-medium dark:text-[var(--textColorLight)] text-[var(--textColorLight)]",
    },
    {
      text: "Designer",
      className:
        "text-xs/normal sm:text-sm/normal md:text-base/normal font-medium dark:text-[var(--textColorLight)] text-[var(--textColorLight)]",
    },
    {
      text: "&",
      className:
        "text-xs/normal sm:text-sm/normal md:text-base/normal dark:text-[var(--textColorLight)] text-[var(--textColorLight)]",
    },
    {
      text: "Full",
      className:
        "text-xs/normal sm:text-sm/normal md:text-base/normal dark:text-[var(--textColorLight)] text-[var(--textColorLight)]",
    },
    {
      text: "Stack",
      className:
        "text-xs/normal sm:text-sm/normal md:text-base/normal dark:text-[var(--textColorLight)] text-[var(--textColorLight)]",
    },
    {
      text: "Developer",
      className:
        "text-xs/normal sm:text-sm/normal md:text-base/normal dark:text-[var(--textColorLight)] text-[var(--textColorLight)]",
    },
  ];

  return (
    <ResponsiveBox
      classNames="dark:bg-[var(--bgColor)] bg-[var(--bgColor)] dark:bg-grid-small-white/[0.2] bg-grid-small-white/[0.2] min-h-screen items-center justify-center relative overflow-hidden rounded-md"
      id={id}
    >
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

      <ConstraintedBox classNames="px-4 py-8 z-20 items-center justify-center">
        <Column classNames="w-full items-center justify-center">
          <TypewriterEffectSmooth words={text_1} delay={0} />
          <TypewriterEffectSmooth
            words={text_2}
            delay={3}
            className="-mt-3 sm:-mt-4 md:-mt-6 lg:-mt-9 xl:-mt-12"
          />

          <HeroButtons />
        </Column>

        <HeroSocialIcons />
      </ConstraintedBox>
    </ResponsiveBox>
  );
};

export default HomeSection1;
