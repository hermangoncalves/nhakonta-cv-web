import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@clerk/clerk-react';

interface ProfileSetupProps {
  onNext: () => void;
}

const ProfileSetup: React.FC<ProfileSetupProps> = ({ onNext }) => {
  const { user } = useUser();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    phone: '',
    bio: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);

    try {
      const { ok } = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/auth/clerk/user-created`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user?.id }),
      });

      if (!ok) throw new Error('Failed to update profile');

      toast({
        title: 'Perfil actualizado!',
        description: 'As suas informações foram guardadas com sucesso.',
      });

      onNext();
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: error.message || 'Ocorreu um erro ao actualizar o perfil.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="fullName">Nome Completo *</Label>
        <Input
          id="fullName"
          name="fullName"
          type="text"
          placeholder="O seu nome completo"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Número de Telefone</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          placeholder="+238 xxx xxxx"
          onChange={handleChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Breve Descrição (Opcional)</Label>
        <Input
          id="bio"
          name="bio"
          type="text"
          placeholder="Conte-nos um pouco sobre si"
          onChange={handleChange}
        />
      </div>

      <div className="flex justify-end pt-4">
        <Button 
          type="submit" 
          className="bg-cv-blue hover:bg-cv-navy"
        >
          {loading ? 'Guardando...' : 'Continuar'}
        </Button>
      </div>
    </form>
  );
};

export default ProfileSetup;