"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { BarChart3, Clock, Package, ShoppingBag, Users, Utensils, Plus, Settings } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/components/auth-provider"
import { AdminNav } from "@/components/admin-nav"

export default function AdminDashboard() {
  const { isAuthenticated, isAdmin } = useAuth()
  const router = useRouter()

  // Redirecionar se não for admin
  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      router.push("/login")
    }
  }, [isAuthenticated, isAdmin, router])

  if (!isAuthenticated || !isAdmin) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <Link href="/admin" className="flex items-center gap-2 text-lg font-bold text-red-600">
            <ShoppingBag className="h-6 w-6" />
            <span>Tradição Mineira - Admin</span>
          </Link>
          <AdminNav />
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-6">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <div className="flex items-center gap-2">
              <Button asChild>
                <Link href="/admin/cardapio/novo">
                  <Plus className="mr-2 h-4 w-4" />
                  Novo Item
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/admin/configuracoes">
                  <Settings className="mr-2 h-4 w-4" />
                  Configurações
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pedidos Hoje</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">+5% em relação a ontem</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Receita Hoje</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 580,00</div>
                <p className="text-xs text-muted-foreground">+12% em relação a ontem</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Clientes Ativos</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">127</div>
                <p className="text-xs text-muted-foreground">+2 novos hoje</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tempo Médio de Entrega</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">32 min</div>
                <p className="text-xs text-muted-foreground">-3 min em relação a ontem</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="pedidos" className="mt-6">
            <TabsList>
              <TabsTrigger value="pedidos">Pedidos Recentes</TabsTrigger>
              <TabsTrigger value="cardapio">Gerenciar Cardápio</TabsTrigger>
              <TabsTrigger value="clientes">Clientes</TabsTrigger>
            </TabsList>
            <TabsContent value="pedidos" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Pedidos Recentes</CardTitle>
                  <CardDescription>Gerencie os pedidos recentes e atualize seus status.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Pedido #1234</p>
                          <p className="text-sm text-muted-foreground">Cliente: João Silva</p>
                          <p className="text-sm text-muted-foreground">2 Marmitex Médio - R$ 39,80</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">Há 15 minutos</p>
                          <div className="mt-1 inline-block rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
                            Em preparo
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          Detalhes
                        </Button>
                        <Button size="sm">Atualizar Status</Button>
                      </div>
                    </div>

                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Pedido #1233</p>
                          <p className="text-sm text-muted-foreground">Cliente: Maria Oliveira</p>
                          <p className="text-sm text-muted-foreground">1 Marmitex Grande - R$ 24,90</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">Há 32 minutos</p>
                          <div className="mt-1 inline-block rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                            Em entrega
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          Detalhes
                        </Button>
                        <Button size="sm">Atualizar Status</Button>
                      </div>
                    </div>

                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Pedido #1232</p>
                          <p className="text-sm text-muted-foreground">Cliente: Carlos Mendes</p>
                          <p className="text-sm text-muted-foreground">3 Marmitex Pequeno - R$ 47,70</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">Há 58 minutos</p>
                          <div className="mt-1 inline-block rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                            Entregue
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          Detalhes
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cardapio" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Gerenciar Cardápio</CardTitle>
                  <CardDescription>Adicione, edite ou remova itens do cardápio.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Utensils className="h-8 w-8 text-red-600" />
                          <div>
                            <p className="font-medium">Arroz Branco</p>
                            <p className="text-sm text-muted-foreground">Categoria: Arroz</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Editar
                          </Button>
                          <Button variant="destructive" size="sm">
                            Remover
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Utensils className="h-8 w-8 text-red-600" />
                          <div>
                            <p className="font-medium">Feijão Carioca</p>
                            <p className="text-sm text-muted-foreground">Categoria: Feijão</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Editar
                          </Button>
                          <Button variant="destructive" size="sm">
                            Remover
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Utensils className="h-8 w-8 text-red-600" />
                          <div>
                            <p className="font-medium">Bife Acebolado</p>
                            <p className="text-sm text-muted-foreground">Categoria: Proteína</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Editar
                          </Button>
                          <Button variant="destructive" size="sm">
                            Remover
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <Button asChild>
                        <Link href="/admin/cardapio/novo">
                          <Plus className="mr-2 h-4 w-4" />
                          Adicionar Novo Item
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="clientes" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Clientes</CardTitle>
                  <CardDescription>Gerencie os clientes cadastrados.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">João Silva</p>
                          <p className="text-sm text-muted-foreground">joao.silva@exemplo.com</p>
                          <p className="text-sm text-muted-foreground">Pedidos: 12</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Ver Pedidos
                          </Button>
                          <Button variant="outline" size="sm">
                            Detalhes
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Maria Oliveira</p>
                          <p className="text-sm text-muted-foreground">maria.oliveira@exemplo.com</p>
                          <p className="text-sm text-muted-foreground">Pedidos: 8</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Ver Pedidos
                          </Button>
                          <Button variant="outline" size="sm">
                            Detalhes
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Carlos Mendes</p>
                          <p className="text-sm text-muted-foreground">carlos.mendes@exemplo.com</p>
                          <p className="text-sm text-muted-foreground">Pedidos: 5</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Ver Pedidos
                          </Button>
                          <Button variant="outline" size="sm">
                            Detalhes
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <footer className="border-t bg-red-50">
        <div className="container flex flex-col gap-4 py-10 md:flex-row md:items-center md:justify-between md:py-12">
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center gap-2 text-lg font-bold text-red-600">
              <ShoppingBag className="h-5 w-5" />
              <span>Tradição Mineira</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Tradição Mineira. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
