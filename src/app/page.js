"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Redireciona para a página de dashboard
    router.replace('/dashboard');
  }, [router]);

  return null; // Retorna null, pois redirecionará automaticamente
}
