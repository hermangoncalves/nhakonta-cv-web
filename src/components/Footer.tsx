import { Building2 } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">nhakonta</span>
          </div>
          <p className="text-gray-50 text-center mt-4">
            Feito com ❤️ por{" "}
            <a
              href="https://github.com/hermangoncalves"
              target="_blank"
              className="text-gray-50 font-bold underline hover:text-gray-300"
            >
              Herman Gonçalves
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
