import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Shield,
  Smartphone,
  ArrowRight,
  Building2,
  Share2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { SignInButton, useUser } from "@clerk/clerk-react";
import { Footer } from "@/components/Footer";

const Index = () => {
  const { isSignedIn } = useUser();

  const features = [
    {
      icon: <Shield className="h-8 w-8 text-indigo-600" />,
      title: "Segurança Total",
      description:
        "Controle completo sobre privacidade e tempo de expiração dos dados compartilhados",
    },
    {
      icon: <Building2 className="h-8 w-8 text-indigo-600" />,
      title: "Múltiplos Bancos",
      description:
        "Centralize dados de BCA, BCN, Caixa Económica, BAI CV e outros bancos locais",
    },
    {
      icon: <Share2 className="h-8 w-8 text-indigo-600" />,
      title: "Compartilhamento Rápido",
      description:
        "Compartilhe via WhatsApp, Messenger, SMS ou email com um simples clique",
    },
    {
      icon: <Smartphone className="h-8 w-8 text-indigo-600" />,
      title: "Mobile First",
      description:
        "Interface otimizada para dispositivos móveis, fácil de usar em qualquer lugar",
    },
  ];

  const banks = [
    "Banco Comercial do Atlântico (BCA)",
    "Banco Cabo Verde Negócios (BCN)",
    "Caixa Económica de Cabo Verde",
    "BAI Cabo Verde",
    "Banco Interatlântico",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-green-50">
      {/* Header */}
      <Navbar />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Gerencie e Compartilhe seus
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-green-600">
              {" "}
              Dados Bancários
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            A plataforma digital para cidadãos cabo-verdianos que facilita o
            armazenamento e compartilhamento de informações bancárias de forma
            simples, segura e centralizada.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isSignedIn ? (
              <Link to="/dashboard">
                <Button size="lg">
                  Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <SignInButton mode="modal">
                <Button size="lg">
                  Começar Agora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </SignInButton>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
            Por que escolher o nhaKonta?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Desenvolvido especificamente para as necessidades dos cabo-verdianos
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white/70 backdrop-blur-sm"
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-3 bg-indigo-50 rounded-full w-fit">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl text-gray-900">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600 leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Banks Section */}
      <section id="banks" className="bg-white/50 backdrop-blur-sm py-16 hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Bancos Suportados
            </h2>
            <p className="text-lg text-gray-600">
              Compatível com os principais bancos de Cabo Verde
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {banks.map((bank, index) => (
              <Card
                key={index}
                className="border-none shadow-md hover:shadow-lg transition-shadow bg-white"
              >
                <CardContent className="p-6 text-center">
                  <Building2 className="h-8 w-8 text-indigo-600 mx-auto mb-3" />
                  <p className="font-medium text-gray-900">{bank}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <Card className="mx-auto border-none shadow-xl bg-gradient-to-r from-indigo-600 to-green-600 text-white">
          <CardContent className="p-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Pronto para começar?
            </h2>
            <p className="text-indigo-100 mb-6 text-lg">
              Junte-se aos cabo-verdianos que já facilitaram suas transações com
              o nhakonta
            </p>
            {isSignedIn ? (
              <Link to="/dashboard">
                <Button
                  size="lg"
                  className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-3 text-lg"
                >
                  Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <SignInButton mode="modal">
                <Button
                  size="lg"
                  className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-3 text-lg"
                >
                  Criar Conta Grátis
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </SignInButton>
            )}
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
