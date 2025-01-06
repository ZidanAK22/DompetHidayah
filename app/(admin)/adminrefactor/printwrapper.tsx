"use client"

interface PrintWrapperProps {
    children: React.ReactNode
    title: string
}

export default function PrintWrapper({ children, title }: PrintWrapperProps) {
    const handlePrint = () => {
        const printContents = document.getElementById('print-content')?.outerHTML
        const originalContents = document.body.innerHTML

        const printHeader = `
      <div class="print-header">
        <img src="/logomasjid.png" alt="Logo" style="width: 100px; height: auto; float: left; margin-right: 10px;" />
        <h2 style="display: inline; font-size: 20px;">${title}</h2>
      </div>
    `

        document.body.innerHTML = printHeader + printContents
        window.print()
        document.body.innerHTML = originalContents
    }

    return (
        <>
            
            <div id="print-content">
                {children}
            </div>
            <button onClick={handlePrint} className="btn-primary bg-primary w-48 p-4 my-4 rounded-xl">
                Print
            </button>
        </>
    )
}