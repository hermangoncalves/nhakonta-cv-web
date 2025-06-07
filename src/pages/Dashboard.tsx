import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, Building2, Share2, Copy, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Navbar } from "@/components/navbar";
import { useUser } from "@clerk/clerk-react";
import { Footer } from "@/components/Footer";
import { useAuth } from "@clerk/clerk-react";
import { BankAccountModalForm } from "@/components/BankAccountForm";
import { ShareDialog } from "@/components/ShareDialog";

import { BankAccount, DashboardSchema, dashboardSchema } from "@/schemas";

const Dashboard = () => {
  const { user } = useUser();
  const { toast } = useToast();
  const { getToken } = useAuth();
  const [dashboardData, setDashboardData] = useState<DashboardSchema | null>(
    null
  );

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAccount, setEditingAccount] = useState<BankAccount | null>(
    null
  );
  const [shareAccount, setShareAccount] = useState<BankAccount | null>(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      const token = await getToken();
      if (!token) {
        throw new Error("Failed to obtain JWT");
      }
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/dashboard`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const json = await response.json();
      const result = dashboardSchema.safeParse(json.data);

      if (!result.success) {
        toast({
          title: "Erro ao obter contas bancárias",
          description: "Por favor, tente novamente mais tarde",
        });
        return;
      }
      setDashboardData(result.data);
    };
    fetchAccounts();
  }, []);

  const copyToClipboard = (text: string | number, label: string) => {
    navigator.clipboard.writeText(text.toString());
    toast({
      title: "Copiado!",
      description: `${label} copiado para a área de transferência`,
    });
  };

  const handleAddAccount = (accountData: BankAccount) => {
    const newAccount = {
      ...accountData,
      id: Date.now().toString(),
    };
    // setAccounts([...accounts, newAccount]);
    setShowAddForm(false);
    toast({
      title: "Conta Adicionada",
      description: "Nova conta bancária foi adicionada com sucesso",
    });
  };

  const handleEditAccount = (accountData: BankAccount) => {
    if (editingAccount) {
      // setAccounts(
      //   accounts.map((acc) =>
      //     acc.id === editingAccount.id
      //       ? { ...accountData, id: editingAccount.id }
      //       : acc
      //   )
      // );
      setEditingAccount(null);
      toast({
        title: "Conta Atualizada",
        description: "Dados da conta foram atualizados com sucesso",
      });
    }
  };

  const handleDeleteAccount = (accountId: number) => {
    // setAccounts(accounts.filter((acc) => acc.id !== accountId));
    toast({
      title: "Conta Removida",
      description: "Conta bancária foi removida com sucesso",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-green-50">
      {/* Header */}
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
            Bem-vindo ao seu nhaKonta, {user.firstName}
          </h1>
          <p className="text-gray-600">
            Gerencie suas contas bancárias e compartilhe dados com segurança
          </p>
        </div>

        {dashboardData ? (
          <>
            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="border-none shadow-lg bg-white/70 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">
                        Total de Contas
                      </p>
                      <p className="text-2xl font-semibold text-gray-900">
                        {dashboardData?.totalAccounts}
                      </p>
                    </div>
                    <Building2 className="h-6 w-6 text-indigo-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg bg-white/70 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">
                        Compartilhamentos
                      </p>
                      <p className="text-2xl font-semibold text-gray-900">
                        {dashboardData?.totalShared}
                      </p>
                    </div>
                    <Share2 className="h-6 w-6 text-indigo-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Accounts Section */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
                Minhas Contas
              </h2>
              <Button
                onClick={() => setShowAddForm(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Conta
              </Button>
            </div>

            {/* Accounts Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dashboardData?.bankAccounts.map((account) => (
                <Card
                  key={account.id}
                  className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white"
                >
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg text-gray-900 flex items-center">
                      <Building2 className="h-5 w-5 mr-2 text-indigo-600" />
                      {account.bankName.split("(")[0].trim()}
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      {account.accountHolderName}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        NIB
                      </label>
                      <div className="flex items-center space-x-2 mt-1">
                        <code className="flex-1 text-xs sm:text-sm bg-gray-50 px-2 py-1 rounded">
                          {account.accountNIB}
                        </code>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() =>
                            copyToClipboard(account.accountNIB, "NIB")
                          }
                          className="p-1 h-7 w-7"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Número da Conta
                      </label>
                      <div className="flex items-center space-x-2 mt-1">
                        <code className="flex-1 text-xs sm:text-sm bg-gray-50 px-2 py-1 rounded">
                          {account.accountNumber}
                        </code>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() =>
                            copyToClipboard(
                              account.accountNumber,
                              "Número da conta"
                            )
                          }
                          className="p-1 h-7 w-7"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex space-x-2 pt-2">
                      <Button
                        size="sm"
                        onClick={() => setShareAccount(account)}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                      >
                        <Share2 className="h-3 w-3 mr-1" />
                        Compartilhar
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingAccount(account)}
                        className="p-2"
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteAccount(account.id)}
                        className="p-2 text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {dashboardData?.bankAccounts.length === 0 && (
              <Card className="border-none shadow-lg bg-white/70 backdrop-blur-sm">
                <CardContent className="p-12 text-center">
                  <Building2 className="h-16 w-16 text-indigo-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Nenhuma conta adicionada
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Adicione sua primeira conta bancária para começar a usar o
                    nhakonta
                  </p>
                  <Button
                    onClick={() => setShowAddForm(true)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Primeira Conta
                  </Button>
                </CardContent>
              </Card>
            )}
          </>
        ) : (
          <div className="flex justify-center mt-14 h-screen">
            <h1>Carregando...</h1>
          </div>
        )}
      </div>

      <Footer />

      {/* Modals */}
      {showAddForm && (
        <BankAccountModalForm
          onSubmit={handleAddAccount}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {editingAccount && (
        <BankAccountModalForm
          initialData={editingAccount}
          onSubmit={handleEditAccount}
          onCancel={() => setEditingAccount(null)}
          isEditing
        />
      )}

      {shareAccount && (
        <ShareDialog
          account={shareAccount}
          onClose={() => setShareAccount(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;
