import Image from "next/image";

interface Props {
  title: string;
  description?: string;
  image?: string;
}

export const EmptyState = ({
  title,
  description,
  image = "/empty.svg",
}: Props) => {
  return (
    <div className="flex flex-col items-center">
      <Image
        className="mb-10"
        src={image}
        alt="Empty"
        width={240}
        height={20}
      />
      <div className="mx-auto flex max-w-md flex-col gap-y-2 text-center">
        <h2 className="font-medium">{title}</h2>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </div>
  );
};
