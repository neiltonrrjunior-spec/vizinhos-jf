import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { sucesso: false, erro: 'Nenhum arquivo enviado' },
        { status: 400 }
      )
    }

    // Validar tipo de arquivo
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { sucesso: false, erro: 'Apenas imagens são permitidas' },
        { status: 400 }
      )
    }

    // Validar tamanho (máx 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { sucesso: false, erro: 'Arquivo muito grande (máximo 5MB)' },
        { status: 400 }
      )
    }

    const buffer = await file.arrayBuffer()
    const filename = `${Date.now()}-${file.name}`
    const path = `fotos/${filename}`

    const { data, error } = await supabase.storage
      .from('vizinhos-jf')
      .upload(path, buffer, {
        contentType: file.type,
      })

    if (error) {
      console.error('Erro ao fazer upload:', error)
      return NextResponse.json(
        { sucesso: false, erro: 'Erro ao fazer upload da foto' },
        { status: 500 }
      )
    }

    // Gerar URL pública
    const { data: publicUrlData } = supabase.storage
      .from('vizinhos-jf')
      .getPublicUrl(path)

    return NextResponse.json(
      { sucesso: true, url: publicUrlData.publicUrl, path },
      { status: 201 }
    )
  } catch (erro) {
    console.error('Erro ao fazer upload:', erro)
    return NextResponse.json(
      { sucesso: false, erro: 'Erro ao fazer upload da foto' },
      { status: 500 }
    )
  }
}
