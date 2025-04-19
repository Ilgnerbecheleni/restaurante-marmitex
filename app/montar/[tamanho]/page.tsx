"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Check, ShoppingBag } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { CartButton } from "@/components/cart-button"
import { useCart } from "@/components/cart-provider"
import { useMobile } from "@/hooks/use-mobile"

export default function MontarMarmitexPage({ params }: { params: { tamanho: string } }) {
  const { tamanho } = params
  const router = useRouter()
  const { toast } = useToast()
  const { addToCart } = useCart()
  const isMobile = useMobile()

  const [selectedItems, setSelectedItems] = useState({
    arroz: "",
    feijao: "",
    proteina: "",
    acompanhamento: [],
    salada: [],
  })

  const precos = {
    pequeno: "R$ 15,90",
    medio: "R$ 19,90",
    grande: "R$ 24,90",
  }

  const tamanhoFormatado = {
    pequeno: "Pequeno",
    medio: "Médio",
    grande: "Grande",
  }

  const limites = {
    pequeno: { proteina: 1, acompanhamento: 2, salada: 1 },
    medio: { proteina: 1, acompanhamento: 3, salada: 2 },
    grande: { proteina: 2, acompanhamento: 4, salada: 3 },
  }

  const opcoes = {
    arroz: ["Arroz Branco", "Arroz Integral", "Arroz com Brócolis"],
    feijao: ["Feijão Carioca", "Feijão Preto", "Feijão Tropeiro"],
    proteina: ["Bife Acebolado", "Frango Grelhado", "Carne Moída", "Filé de Peixe", "Omelete"],
    acompanhamento: ["Batata Frita", "Purê de Batata", "Farofa", "Macarrão", "Legumes Refogados", "Banana Frita"],
    salada: ["Alface", "Tomate", "Cenoura Ralada", "Beterraba", "Repolho", "Pepino"],
  }

  const handleSelectItem = (categoria: string, item: string) => {
    if (categoria === "arroz" || categoria === "feijao") {
      setSelectedItems((prev) => ({ ...prev, [categoria]: item }))
      return
    }

    if (categoria === "proteina") {
      const limite = limites[tamanho as keyof typeof limites].proteina
      if (selectedItems.proteina === item) {
        setSelectedItems((prev) => ({ ...prev, proteina: "" }))
      } else {
        const currentItems = selectedItems.proteina ? [selectedItems.proteina] : []
        if (currentItems.length < limite) {
          setSelectedItems((prev) => ({ ...prev, proteina: item }))
        } else {
          toast({
            title: "Limite atingido",
            description: `Você pode escolher apenas ${limite} proteína no marmitex ${tamanhoFormatado[tamanho as keyof typeof tamanhoFormatado]}.`,
            variant: "destructive",
          })
        }
      }
      return
    }

    if (categoria === "acompanhamento" || categoria === "salada") {
      const limite = limites[tamanho as keyof typeof limites][categoria as "acompanhamento" | "salada"]
      const currentItems = [...selectedItems[categoria as "acompanhamento" | "salada"]]

      if (currentItems.includes(item)) {
        const updatedItems = currentItems.filter((i) => i !== item)
        setSelectedItems((prev) => ({ ...prev, [categoria]: updatedItems }))
      } else {
        if (currentItems.length < limite) {
          setSelectedItems((prev) => ({ ...prev, [categoria]: [...currentItems, item] }))
        } else {
          toast({
            title: "Limite atingido",
            description: `Você pode escolher apenas ${limite} itens de ${categoria} no marmitex ${tamanhoFormatado[tamanho as keyof typeof tamanhoFormatado]}.`,
            variant: "destructive",
          })
        }
      }
    }
  }

  const isItemSelected = (categoria: string, item: string) => {
    if (categoria === "arroz" || categoria === "feijao") {
      return selectedItems[categoria as "arroz" | "feijao"] === item
    }

    if (categoria === "proteina") {
      return selectedItems.proteina === item
    }

    return selectedItems[categoria as "acompanhamento" | "salada"].includes(item)
  }

  const handleAddToCart = () => {
    // Verificar se todas as seleções obrigatórias foram feitas
    if (!selectedItems.arroz) {
      toast({
        title: "Seleção incompleta",
        description: "Por favor, selecione um tipo de arroz.",
        variant: "destructive",
      })
      return
    }

    if (!selectedItems.feijao) {
      toast({
        title: "Seleção incompleta",
        description: "Por favor, selecione um tipo de feijão.",
        variant: "destructive",
      })
      return
    }

    if (!selectedItems.proteina) {
      toast({
        title: "Seleção incompleta",
        description: "Por favor, selecione pelo menos uma proteína.",
        variant: "destructive",
      })
      return
    }

    // Adicionar ao carrinho
    const marmitex = {
      id: Date.now().toString(),
      tamanho: tamanhoFormatado[tamanho as keyof typeof tamanhoFormatado],
      preco: precos[tamanho as keyof typeof precos],
      itens: {
        arroz: selectedItems.arroz,
        feijao: selectedItems.feijao,
        proteina: selectedItems.proteina,
        acompanhamento: selectedItems.acompanhamento,
        salada: selectedItems.salada,
      },
    }

    addToCart(marmitex)

    toast({
      title: "Marmitex adicionado",
      description: "Seu marmitex foi adicionado ao carrinho com sucesso!",
    })

    router.push("/carrinho")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold text-red-600">
            <ShoppingBag className="h-6 w-6" />
            <span>Tradição Mineira</span>
          </Link>
          <CartButton />
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-6">
          <div className="mb-6 flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Voltar</span>
              </Link>
            </Button>
            <h1 className="text-2xl font-bold tracking-tight">
              Monte seu Marmitex {tamanhoFormatado[tamanho as keyof typeof tamanhoFormatado]}
            </h1>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
            <div>
              <Tabs defaultValue="arroz" className="w-full">
                {isMobile ? (
                  <div className="overflow-x-auto pb-2">
                    <TabsList className="inline-flex w-auto">
                      <TabsTrigger value="arroz" className="px-3">
                        Arroz
                      </TabsTrigger>
                      <TabsTrigger value="feijao" className="px-3">
                        Feijão
                      </TabsTrigger>
                      <TabsTrigger value="proteina" className="px-3">
                        Proteínas
                      </TabsTrigger>
                      <TabsTrigger value="acompanhamento" className="px-3">
                        Acompanhamentos
                      </TabsTrigger>
                      <TabsTrigger value="salada" className="px-3">
                        Saladas
                      </TabsTrigger>
                    </TabsList>
                  </div>
                ) : (
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="arroz">Arroz</TabsTrigger>
                    <TabsTrigger value="feijao">Feijão</TabsTrigger>
                    <TabsTrigger value="proteina">Proteínas</TabsTrigger>
                    <TabsTrigger value="acompanhamento">Acompanhamentos</TabsTrigger>
                    <TabsTrigger value="salada">Saladas</TabsTrigger>
                  </TabsList>
                )}

                <TabsContent value="arroz" className="mt-6">
                  <h2 className="mb-4 text-xl font-semibold">Escolha seu arroz</h2>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {opcoes.arroz.map((item) => (
                      <Card
                        key={item}
                        className={`cursor-pointer transition-all ${isItemSelected("arroz", item) ? "border-red-500 bg-red-50" : ""}`}
                        onClick={() => handleSelectItem("arroz", item)}
                      >
                        <CardHeader className="p-3 sm:p-4">
                          <CardTitle className="text-base flex justify-between items-center">
                            <span className="mr-2">{item}</span>
                            {isItemSelected("arroz", item) && <Check className="h-5 w-5 flex-shrink-0 text-red-600" />}
                          </CardTitle>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="feijao" className="mt-6">
                  <h2 className="mb-4 text-xl font-semibold">Escolha seu feijão</h2>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {opcoes.feijao.map((item) => (
                      <Card
                        key={item}
                        className={`cursor-pointer transition-all ${isItemSelected("feijao", item) ? "border-red-500 bg-red-50" : ""}`}
                        onClick={() => handleSelectItem("feijao", item)}
                      >
                        <CardHeader className="p-3 sm:p-4">
                          <CardTitle className="text-base flex justify-between items-center">
                            <span className="mr-2">{item}</span>
                            {isItemSelected("feijao", item) && <Check className="h-5 w-5 flex-shrink-0 text-red-600" />}
                          </CardTitle>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="proteina" className="mt-6">
                  <h2 className="mb-4 text-xl font-semibold">
                    Escolha sua proteína
                    <span className="ml-2 text-sm font-normal text-muted-foreground">
                      (Máximo: {limites[tamanho as keyof typeof limites].proteina})
                    </span>
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {opcoes.proteina.map((item) => (
                      <Card
                        key={item}
                        className={`cursor-pointer transition-all ${isItemSelected("proteina", item) ? "border-red-500 bg-red-50" : ""}`}
                        onClick={() => handleSelectItem("proteina", item)}
                      >
                        <CardHeader className="p-3 sm:p-4">
                          <CardTitle className="text-base flex justify-between items-center">
                            <span className="mr-2">{item}</span>
                            {isItemSelected("proteina", item) && (
                              <Check className="h-5 w-5 flex-shrink-0 text-red-600" />
                            )}
                          </CardTitle>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="acompanhamento" className="mt-6">
                  <h2 className="mb-4 text-xl font-semibold">
                    Escolha seus acompanhamentos
                    <span className="ml-2 text-sm font-normal text-muted-foreground">
                      (Máximo: {limites[tamanho as keyof typeof limites].acompanhamento})
                    </span>
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {opcoes.acompanhamento.map((item) => (
                      <Card
                        key={item}
                        className={`cursor-pointer transition-all ${isItemSelected("acompanhamento", item) ? "border-red-500 bg-red-50" : ""}`}
                        onClick={() => handleSelectItem("acompanhamento", item)}
                      >
                        <CardHeader className="p-3 sm:p-4">
                          <CardTitle className="text-base flex justify-between items-center">
                            <span className="mr-2">{item}</span>
                            {isItemSelected("acompanhamento", item) && (
                              <Check className="h-5 w-5 flex-shrink-0 text-red-600" />
                            )}
                          </CardTitle>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="salada" className="mt-6">
                  <h2 className="mb-4 text-xl font-semibold">
                    Escolha suas saladas
                    <span className="ml-2 text-sm font-normal text-muted-foreground">
                      (Máximo: {limites[tamanho as keyof typeof limites].salada})
                    </span>
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {opcoes.salada.map((item) => (
                      <Card
                        key={item}
                        className={`cursor-pointer transition-all ${isItemSelected("salada", item) ? "border-red-500 bg-red-50" : ""}`}
                        onClick={() => handleSelectItem("salada", item)}
                      >
                        <CardHeader className="p-3 sm:p-4">
                          <CardTitle className="text-base flex justify-between items-center">
                            <span className="mr-2">{item}</span>
                            {isItemSelected("salada", item) && <Check className="h-5 w-5 flex-shrink-0 text-red-600" />}
                          </CardTitle>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div>
              <Card className={`${isMobile ? "mt-6" : "sticky top-24"}`}>
                <CardHeader>
                  <CardTitle>Resumo do Marmitex</CardTitle>
                  <CardDescription>
                    Marmitex {tamanhoFormatado[tamanho as keyof typeof tamanhoFormatado]} -{" "}
                    {precos[tamanho as keyof typeof precos]}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium">Arroz</h3>
                      <p className="text-sm text-muted-foreground">{selectedItems.arroz || "Nenhum selecionado"}</p>
                    </div>
                    <Separator />
                    <div>
                      <h3 className="font-medium">Feijão</h3>
                      <p className="text-sm text-muted-foreground">{selectedItems.feijao || "Nenhum selecionado"}</p>
                    </div>
                    <Separator />
                    <div>
                      <h3 className="font-medium">Proteína</h3>
                      <p className="text-sm text-muted-foreground">{selectedItems.proteina || "Nenhum selecionado"}</p>
                    </div>
                    <Separator />
                    <div>
                      <h3 className="font-medium">Acompanhamentos</h3>
                      <p className="text-sm text-muted-foreground">
                        {selectedItems.acompanhamento.length > 0
                          ? selectedItems.acompanhamento.join(", ")
                          : "Nenhum selecionado"}
                      </p>
                    </div>
                    <Separator />
                    <div>
                      <h3 className="font-medium">Saladas</h3>
                      <p className="text-sm text-muted-foreground">
                        {selectedItems.salada.length > 0 ? selectedItems.salada.join(", ") : "Nenhum selecionado"}
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-red-600 hover:bg-red-700" onClick={handleAddToCart}>
                    Adicionar ao Carrinho
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
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
