"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ShoppingBag } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { CartButton } from "@/components/cart-button"
import { useCart } from "@/components/cart-provider"
import { useMobile } from "@/hooks/use-mobile"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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
    acompanhamento: [] as string[],
    salada: [] as string[],
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

  const handleSelectSingle = (categoria: "arroz" | "feijao" | "proteina", value: string) => {
    setSelectedItems((prev) => ({ ...prev, [categoria]: value }))
  }

  const handleToggleMultiple = (categoria: "acompanhamento" | "salada", item: string) => {
    const limite = limites[tamanho as keyof typeof limites][categoria]
    const currentItems = [...selectedItems[categoria]]

    if (currentItems.includes(item)) {
      // Remover item
      const updatedItems = currentItems.filter((i) => i !== item)
      setSelectedItems((prev) => ({ ...prev, [categoria]: updatedItems }))
    } else {
      // Adicionar item se não exceder o limite
      if (currentItems.length < limite) {
        setSelectedItems((prev) => ({ ...prev, [categoria]: [...currentItems, item] }))
      } else {
        toast({
          title: "Limite atingido",
          description: `Você pode escolher apenas ${limite} itens de ${categoria === "acompanhamento" ? "acompanhamento" : "salada"} no marmitex ${tamanhoFormatado[tamanho as keyof typeof tamanhoFormatado]}.`,
          variant: "destructive",
        })
      }
    }
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
        <div className="w-full px-2 sm:px-4 flex h-16 items-center justify-between py-4 max-w-7xl mx-auto">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold text-red-600">
            <ShoppingBag className="h-6 w-6" />
            <span>Tradição Mineira</span>
          </Link>
          <CartButton />
        </div>
      </header>
      <main className="flex-1 w-full">
        <div className="w-full px-2 sm:px-4 py-6 max-w-7xl mx-auto">
          <div className="mb-6 flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Voltar</span>
              </Link>
            </Button>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
              Monte seu Marmitex {tamanhoFormatado[tamanho as keyof typeof tamanhoFormatado]}
            </h1>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Monte seu Marmitex</CardTitle>
                  <CardDescription>
                    Selecione os ingredientes para o seu Marmitex{" "}
                    {tamanhoFormatado[tamanho as keyof typeof tamanhoFormatado]} -{" "}
                    {precos[tamanho as keyof typeof precos]}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Seção Arroz */}
                  <div>
                    <Label htmlFor="arroz" className="text-base font-medium">
                      1. Escolha seu arroz <span className="text-red-500">*</span>
                    </Label>
                    <Select value={selectedItems.arroz} onValueChange={(value) => handleSelectSingle("arroz", value)}>
                      <SelectTrigger id="arroz" className="mt-2">
                        <SelectValue placeholder="Selecione o arroz" />
                      </SelectTrigger>
                      <SelectContent>
                        {opcoes.arroz.map((item) => (
                          <SelectItem key={item} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Seção Feijão */}
                  <div>
                    <Label htmlFor="feijao" className="text-base font-medium">
                      2. Escolha seu feijão <span className="text-red-500">*</span>
                    </Label>
                    <Select value={selectedItems.feijao} onValueChange={(value) => handleSelectSingle("feijao", value)}>
                      <SelectTrigger id="feijao" className="mt-2">
                        <SelectValue placeholder="Selecione o feijão" />
                      </SelectTrigger>
                      <SelectContent>
                        {opcoes.feijao.map((item) => (
                          <SelectItem key={item} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Seção Proteína */}
                  <div>
                    <Label htmlFor="proteina" className="text-base font-medium">
                      3. Escolha sua proteína <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={selectedItems.proteina}
                      onValueChange={(value) => handleSelectSingle("proteina", value)}
                    >
                      <SelectTrigger id="proteina" className="mt-2">
                        <SelectValue placeholder="Selecione a proteína" />
                      </SelectTrigger>
                      <SelectContent>
                        {opcoes.proteina.map((item) => (
                          <SelectItem key={item} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Seção Acompanhamentos */}
                  <div>
                    <div className="flex items-center justify-between">
                      <Label className="text-base font-medium">4. Escolha seus acompanhamentos</Label>
                      <span className="text-sm text-muted-foreground">
                        (Máximo: {limites[tamanho as keyof typeof limites].acompanhamento})
                      </span>
                    </div>
                    <div className="mt-2 grid gap-2 sm:grid-cols-2">
                      {opcoes.acompanhamento.map((item) => (
                        <div key={item} className="flex items-center space-x-2">
                          <Checkbox
                            id={`acompanhamento-${item}`}
                            checked={selectedItems.acompanhamento.includes(item)}
                            onCheckedChange={() => handleToggleMultiple("acompanhamento", item)}
                          />
                          <Label htmlFor={`acompanhamento-${item}`} className="text-sm font-normal cursor-pointer">
                            {item}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Seção Saladas */}
                  <div>
                    <div className="flex items-center justify-between">
                      <Label className="text-base font-medium">5. Escolha suas saladas</Label>
                      <span className="text-sm text-muted-foreground">
                        (Máximo: {limites[tamanho as keyof typeof limites].salada})
                      </span>
                    </div>
                    <div className="mt-2 grid gap-2 sm:grid-cols-2">
                      {opcoes.salada.map((item) => (
                        <div key={item} className="flex items-center space-x-2">
                          <Checkbox
                            id={`salada-${item}`}
                            checked={selectedItems.salada.includes(item)}
                            onCheckedChange={() => handleToggleMultiple("salada", item)}
                          />
                          <Label htmlFor={`salada-${item}`} className="text-sm font-normal cursor-pointer">
                            {item}
                          </Label>
                        </div>
                      ))}
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

            {/* Resumo do pedido */}
            <div className={isMobile ? "hidden lg:block" : ""}>
              <Card className="sticky top-24">
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

      {/* Botão flutuante para mobile */}
      {isMobile && (
        <div className="fixed bottom-4 right-4 z-50">
          <Button className="bg-red-600 hover:bg-red-700 shadow-lg" size="lg" onClick={handleAddToCart}>
            Adicionar ao Carrinho
          </Button>
        </div>
      )}

      <footer className="border-t bg-red-50">
        <div className="w-full px-2 sm:px-4 py-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:py-12 max-w-7xl mx-auto">
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
