import Link from "next/link"
import { ShoppingBag } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MarmitexCard } from "@/components/marmitex-card"
import { Header } from "@/components/header"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="container py-12 md:py-16">
          <div className="grid gap-6 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-red-700 sm:text-4xl md:text-5xl">
              Marmitex da Tradição Mineira
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-700 md:text-xl">
              Monte seu marmitex com os melhores ingredientes, escolhendo exatamente o que você deseja comer.
            </p>
          </div>
        </section>
        <section className="container py-8 md:py-12">
          <div className="grid gap-6">
            <h2 className="text-2xl font-bold tracking-tight">Escolha o tamanho do seu marmitex</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <MarmitexCard
                title="Marmitex Pequeno"
                description="Ideal para crianças ou lanches leves"
                price="R$ 15,90"
                size="pequeno"
                image="/placeholder.svg?height=200&width=300"
              />
              <MarmitexCard
                title="Marmitex Médio"
                description="Perfeito para uma refeição completa"
                price="R$ 19,90"
                size="medio"
                image="/placeholder.svg?height=200&width=300"
              />
              <MarmitexCard
                title="Marmitex Grande"
                description="Para quem tem um apetite maior"
                price="R$ 24,90"
                size="grande"
                image="/placeholder.svg?height=200&width=300"
              />
            </div>
          </div>
        </section>
        <section className="bg-red-50 py-12">
          <div className="container">
            <div className="grid gap-6">
              <h2 className="text-2xl font-bold tracking-tight">Como funciona</h2>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>1. Escolha o tamanho</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Selecione entre os tamanhos pequeno, médio ou grande de acordo com sua fome.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>2. Monte seu marmitex</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Escolha os ingredientes que deseja em cada categoria: arroz, feijão, carnes, saladas e
                      acompanhamentos.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>3. Finalize seu pedido</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Revise seu pedido, adicione observações se necessário e finalize a compra.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
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
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Termos de Serviço
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Política de Privacidade
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Contato
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
