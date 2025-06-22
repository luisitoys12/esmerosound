import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Términos y Condiciones</CardTitle>
          <CardDescription>Última actualización: {new Date().toLocaleDateString('es-ES')}</CardDescription>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p>Bienvenido a Esmerosound. Estos términos y condiciones describen las reglas y regulaciones para el uso del sitio web de Esmerosound.</p>
          
          <p>Al acceder a este sitio web, asumimos que aceptas estos términos y condiciones. No continúes usando Esmerosound si no estás de acuerdo con todos los términos y condiciones establecidos en esta página.</p>

          <h2>Cookies</h2>
          <p>El sitio web utiliza cookies para ayudar a personalizar tu experiencia en línea. Al acceder a Esmerosound, aceptaste utilizar las cookies necesarias.</p>

          <h2>Licencia</h2>
          <p>A menos que se indique lo contrario, Esmerosound y/o sus licenciantes poseen los derechos de propiedad intelectual de todo el material en Esmerosound. Todos los derechos de propiedad intelectual son reservados. Puedes acceder a esto desde Esmerosound para tu uso personal sujeto a las restricciones establecidas en estos términos y condiciones.</p>

          <p>No debes:</p>
          <ul>
            <li>Volver a publicar material de Esmerosound</li>
            <li>Vender, alquilar o sublicenciar material de Esmerosound</li>
            <li>Reproducir, duplicar o copiar material de Esmerosound</li>
            <li>Redistribuir contenido de Esmerosound</li>
          </ul>

          <h2>Exención de responsabilidad</h2>
          <p>En la medida máxima permitida por la ley aplicable, excluimos todas las representaciones, garantías y condiciones relacionadas con nuestro sitio web y el uso de este sitio web. Nada en este descargo de responsabilidad:</p>
          <ul>
            <li>limitará o excluirá nuestra o tu responsabilidad por muerte o lesiones personales;</li>
            <li>limitará o excluirá nuestra o tu responsabilidad por fraude o tergiversación fraudulenta;</li>
            <li>limitará cualquiera de nuestras o tus responsabilidades de cualquier manera que no esté permitida por la ley aplicable; o</li>
            <li>excluirá cualquiera de nuestras o tus responsabilidades que no puedan ser excluidas bajo la ley aplicable.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
