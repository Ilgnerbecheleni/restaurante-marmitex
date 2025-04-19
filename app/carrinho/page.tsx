"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/components/cart-provider"

export default function CarrinhoPage() {
  const { toast } = useToast()
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart()
  const [endereco, setEndereco] = useState({
    rua: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    telefone: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEndereco((prev) => ({ ...prev, [name]: value }))
  }

  const calcularTotal = () => {
    return cart.reduce((total, item) => {
      const preco = Number.parseFloat(item.preco.replace("R$ ", "").replace(",", "."))
      return total + preco * item.quantidade
    }, 0)
  }

  const handleFinalizarPedido = () => {
    // Validar campos obrigatórios
    if (!endereco.rua || !endereco.numero || !endereco.bairro || !endereco.cidade || !endereco.telefone) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      })
      return
    }

    // Em uma aplicação real, aqui enviaria os dados para o backend
    toast({
      title: "Pedido realizado com sucesso!",
      description: "Seu pedido foi enviado e está sendo preparado.",
    })

    // Limpar carrinho e redirecionar
    clearCart()
    // Em uma aplicação real, redirecionaria para uma página de confirmação
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold text-red-600">
            <ShoppingBag className="h-6 w-6" />
            <span>Tradição Mineira</span>
          </Link>
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
            <h1 className="text-2xl font-bold tracking-tight">Seu Carrinho</h1>
          </div>

          {cart.length === 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>Seu carrinho está vazio</CardTitle>
                <CardDescription>Adicione alguns marmitex para continuar.</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button asChild>
                  <Link href="/">Voltar para o cardápio</Link>
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-[1fr_400px]">
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Itens do Pedido</CardTitle>
                    <CardDescription>Revise os itens do seu pedido</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {cart.map((item) => (
                        <div key={item.id} className="rounded-lg border p-4">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-medium">Marmitex {item.tamanho}</h3>
                              <p className="text-sm text-muted-foreground">{item.preco}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => updateQuantity(item.id, Math.max(1, item.quantidade - 1))}
                              >
                                <Minus className="h-4 w-4" />
                                <span className="sr-only">Diminuir</span>
                              </Button>
                              <span>{item.quantidade}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => updateQuantity(item.id, item.quantidade + 1)}
                              >
                                <Plus className="h-4 w-4" />
                                <span className="sr-only">Aumentar</span>
                              </Button>
                              <Button
                                variant="outline"
                                size="icon"
                                className="text-red-500"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Remover</span>
                              </Button>
                            </div>
                          </div>
                          <Separator className="my-4" />
                          <div className="space-y-2 text-sm">
                            <p>
                              <strong>Arroz:</strong> {item.itens.arroz}
                            </p>
                            <p>
                              <strong>Feijão:</strong> {item.itens.feijao}
                            </p>
                            <p>
                              <strong>Proteína:</strong> {item.itens.proteina}
                            </p>
                            <p>
                              <strong>Acompanhamentos:</strong> {item.itens.acompanhamento.join(", ") || "Nenhum"}
                            </p>
                            <p>
                              <strong>Saladas:</strong> {item.itens.salada.join(", ") || "Nenhum"}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle>Resumo do Pedido</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>R$ {calcularTotal().toFixed(2).replace(".", ",")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Taxa de entrega</span>
                        <span>R$ 5,00</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-medium">
                        <span>Total</span>
                        <span>R$ {(calcularTotal() + 5).toFixed(2).replace(".", ",")}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Informações de Entrega</CardTitle>
                    <CardDescription>Preencha os dados para entrega</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid gap-2">
                        <Label htmlFor="rua">Rua *</Label>
                        <Input id="rua" name="rua" value={endereco.rua} onChange={handleInputChange} required />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="numero">Número *</Label>
                          <Input
                            id="numero"
                            name="numero"
                            value={endereco.numero}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="complemento">Complemento</Label>
                          <Input
                            id="complemento"
                            name="complemento"
                            value={endereco.complemento}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="bairro">Bairro *</Label>
                        <Input
                          id="bairro"
                          name="bairro"
                          value={endereco.bairro}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="cidade">Cidade *</Label>
                        <Input
                          id="cidade"
                          name="cidade"
                          value={endereco.cidade}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="telefone">Telefone *</Label>
                        <Input
                          id="telefone"
                          name="telefone"
                          value={endereco.telefone}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-red-600 hover:bg-red-700" onClick={handleFinalizarPedido}>
                      Finalizar Pedido
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          )}
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
