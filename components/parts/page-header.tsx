interface Props {
  title: string
}

export const PageHeader = ({ title }: Props) => (
  <header>
    <div className='mx-auto max-w-7xl py-4 px-4 sm:px-6 lg:px-8'>
      <h1 className='text-3xl font-bold tracking-tight text-gray-900'>{title}</h1>
    </div>
  </header>
)
