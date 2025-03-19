interface QuestionDisplayProps {
    question: string;
  }
  
  export default function QuestionDisplay({ question }: QuestionDisplayProps) {
    return (
      <div className="bg-white shadow-md rounded p-4 text-center text-lg font-semibold">
        {question}
      </div>
    );
  }
  