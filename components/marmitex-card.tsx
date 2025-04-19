import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface MarmitexCardProps {
  title: string
  description: string
  price: string
  size: string
  image: string
}

export function MarmitexCard({ title, description, price, size, image }: MarmitexCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-video w-full overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          width={300}
          height={200}
          className="h-full w-full object-cover transition-all hover:scale-105"
        />
      </div>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold text-gold-600">{price}</p>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full bg-red-600 hover:bg-red-700">
          <Link href={`/montar/${size}`}>Montar Marmitex</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
