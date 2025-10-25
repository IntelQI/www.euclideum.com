interface DocumentNotFoundProps {
  messages?: {
    title: string;
    description: string;
  };
}

export function DocumentNotFound({ messages }: DocumentNotFoundProps = {}) {
  const title = messages?.title || "Document not found";
  const description =
    messages?.description || "The document you are looking for does not exist.";

  return (
    <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
      <div className="mx-auto w-full min-w-0">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold">🙀 {title}</h1>
          <p>{description}</p>
        </div>
      </div>
    </main>
  );
}
