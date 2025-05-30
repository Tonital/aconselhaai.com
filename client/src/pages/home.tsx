import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ChatModal from "@/components/chat-modal";
import { Heart, Play, CheckCircle, Lock, Shield, CircleDotDashed, Brain, Lightbulb, Clock, KeyRound, Globe, ChevronDown, Instagram, Facebook, Linkedin, TriangleAlert, Bot, MessageSquare, Star, Beer, Timer } from "lucide-react";

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const openChat = () => {
    setIsChatOpen(true);
  };

  const closeChat = () => {
    setIsChatOpen(false);
  };

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-400 rounded-lg flex items-center justify-center">
              <Heart className="text-white text-lg" />
            </div>
            <span className="text-2xl font-bold text-slate-800">Aconselha Aí</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#como-funciona" className="text-slate-600 hover:text-blue-500 transition-colors">Como Funciona</a>
            <a href="#sobre" className="text-slate-600 hover:text-blue-500 transition-colors">Sobre</a>
            <a href="#faq" className="text-slate-600 hover:text-blue-500 transition-colors">FAQ</a>
            <Button onClick={openChat} className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
              Teste Grátis
            </Button>
          </div>
          <button className="md:hidden text-slate-600">
            <Beer className="text-xl" />
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="gradient-bg text-white py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto text-center relative z-10 animate-fade-in">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Bem-vindo ao{" "}
              <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                Aconselha Aí
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed">
              Converse com um assistente de IA especializado em suporte emocional.<br />
              Refletir sobre seus sentimentos nunca foi tão simples e acessível.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                onClick={openChat}
                className="bg-white text-blue-500 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all transform hover:scale-105 shadow-lg"
              >
                <Play className="mr-2" size={20} />
                Iniciar Teste Grátis (5min)
              </Button>
              <div className="flex items-center space-x-2 text-white/80">
                <Shield size={20} />
                <span>100% Confidencial</span>
              </div>
            </div>
            <div className="flex justify-center space-x-8 text-white/80">
              <div className="flex items-center space-x-2">
                <CheckCircle className="text-green-300" size={20} />
                <span>Sem cadastro necessário</span>
              </div>
              <div className="flex items-center space-x-2">
                <Lock className="text-blue-300" size={20} />
                <span>Privacidade garantida</span>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 right-8 animate-float">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center glass-effect">
            <MessageSquare className="text-white" size={32} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="como-funciona" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Como o Aconselha Aí funciona?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Uma experiência simples e segura para explorar seus sentimentos com o suporte da inteligência artificial
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg">
                <CircleDotDashed className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-semibold text-slate-800 mb-4">Converse Naturalmente</h3>
              <p className="text-slate-600 leading-relaxed">
                Compartilhe seus sentimentos e pensamentos como faria com um amigo de confiança. Nossa IA está aqui para ouvir.
              </p>
            </div>
            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg">
                <Brain className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-semibold text-slate-800 mb-4">Reflexões Guiadas</h3>
              <p className="text-slate-600 leading-relaxed">
                Receba perguntas reflexivas e insights personalizados que ajudam você a entender melhor suas emoções.
              </p>
            </div>
            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg">
                <Lightbulb className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-semibold text-slate-800 mb-4">Insights Personalizados</h3>
              <p className="text-slate-600 leading-relaxed">
                Obtenha perspectivas úteis e estratégias de enfrentamento adaptadas ao seu contexto único.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Chat Preview */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Experimente uma conversa real
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Veja como seria uma sessão típica com nosso assistente de IA especializado em suporte emocional
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <Card className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Assistente Aconselha Aí</h3>
                    <p className="text-white/80 text-sm">Online agora • Aqui para ajudar</p>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6 h-96 overflow-y-auto bg-gray-50">
                <div className="flex items-start space-x-3 mb-6">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <Bot className="text-white text-xs" />
                  </div>
                  <div className="bg-white rounded-2xl rounded-tl-sm p-4 shadow-sm max-w-xs">
                    <p className="text-slate-700">Olá! Sou seu assistente de suporte emocional. Como você está se sentindo hoje?</p>
                    <span className="text-xs text-slate-400 mt-2 block">Agora mesmo</span>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 mb-6 justify-end">
                  <div className="bg-blue-500 text-white rounded-2xl rounded-tr-sm p-4 shadow-sm max-w-xs">
                    <p>Oi... estou me sentindo um pouco ansioso sobre uma apresentação no trabalho amanhã.</p>
                    <span className="text-blue-100 text-xs mt-2 block">Agora mesmo</span>
                  </div>
                  <div className="w-8 h-8 bg-slate-300 rounded-full flex items-center justify-center">
                    <span className="text-slate-600 text-xs font-semibold">U</span>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 mb-6">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <Bot className="text-white text-xs" />
                  </div>
                  <div className="bg-white rounded-2xl rounded-tl-sm p-4 shadow-sm max-w-xs">
                    <p className="text-slate-700">Entendo que apresentações podem gerar ansiedade. Que parte específica da apresentação mais te preocupa? É o conteúdo, falar em público, ou algo mais?</p>
                    <span className="text-xs text-slate-400 mt-2 block">Agora mesmo</span>
                  </div>
                </div>
              </CardContent>
              
              <div className="p-6 bg-white border-t border-gray-200">
                <div className="flex space-x-3">
                  <input 
                    type="text" 
                    placeholder="Digite sua mensagem..." 
                    className="flex-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    disabled 
                  />
                  <Button className="bg-blue-500 text-white p-3 rounded-xl hover:bg-blue-600 transition-colors" disabled>
                    <Play size={16} />
                  </Button>
                </div>
                <p className="text-xs text-slate-500 mt-2 text-center">Esta é apenas uma demonstração. Clique em "Iniciar Teste Grátis" para começar uma conversa real.</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              O que nossos usuários dizem
            </h2>
            <p className="text-xl text-slate-600">
              Experiências reais de pessoas que encontraram apoio e clareza
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="fill-current" size={16} />
                  ))}
                </div>
              </div>
              <p className="text-slate-700 mb-6 leading-relaxed">
                "Nunca pensei que conversar com uma IA pudesse ser tão reconfortante. Me ajudou a organizar meus pensamentos sobre uma situação difícil no trabalho."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">M</span>
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-slate-800">Maria S.</p>
                  <p className="text-slate-600 text-sm">Psicóloga</p>
                </div>
              </div>
            </Card>
            
            <Card className="bg-gradient-to-br from-green-50 to-teal-50 p-8 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="fill-current" size={16} />
                  ))}
                </div>
              </div>
              <p className="text-slate-700 mb-6 leading-relaxed">
                "O teste grátis me convenceu. É incrível como o assistente faz perguntas que realmente me fazem refletir. Sinto que estou sendo realmente ouvido."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">J</span>
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-slate-800">João P.</p>
                  <p className="text-slate-600 text-sm">Engenheiro</p>
                </div>
              </div>
            </Card>
            
            <Card className="bg-gradient-to-br from-orange-50 to-red-50 p-8 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="fill-current" size={16} />
                  ))}
                </div>
              </div>
              <p className="text-slate-700 mb-6 leading-relaxed">
                "Estava passando por um momento difícil e não sabia com quem conversar. O Aconselha Aí me deu o espaço seguro que eu precisava para processar meus sentimentos."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-400 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">A</span>
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-slate-800">Ana L.</p>
                  <p className="text-slate-600 text-sm">Estudante</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-4 bg-slate-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-xl text-slate-600">
              Esclarecemos suas dúvidas sobre o Aconselha Aí
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {[
                {
                  question: "O Aconselha Aí substitui terapia profissional?",
                  answer: "Não. O Aconselha Aí é uma ferramenta de apoio emocional que pode complementar, mas nunca substituir, o atendimento de profissionais de saúde mental. Recomendamos sempre buscar ajuda profissional quando necessário."
                },
                {
                  question: "Minhas conversas são realmente privadas?",
                  answer: "Sim. Todas as conversas são criptografadas e não armazenamos informações pessoais identificáveis. Sua privacidade e confidencialidade são nossa prioridade máxima."
                },
                {
                  question: "Como funciona o teste grátis de 5 minutos?",
                  answer: "O teste grátis permite que você experimente uma conversa completa por 5 minutos, sem necessidade de cadastro ou pagamento. É uma oportunidade de conhecer nosso assistente e ver se a abordagem funciona para você."
                },
                {
                  question: "A IA entende contexto cultural brasileiro?",
                  answer: "Sim. Nosso assistente foi treinado especificamente para entender nuances culturais, expressões e contextos brasileiros, oferecendo um suporte mais personalizado e culturalmente apropriado."
                }
              ].map((faq, index) => (
                <Card key={index} className="bg-white shadow-sm border border-gray-200">
                  <button 
                    className="w-full text-left p-6 focus:outline-none"
                    onClick={() => toggleFaq(index)}
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-slate-800">{faq.question}</h3>
                      <ChevronDown 
                        className={`text-slate-400 transform transition-transform ${
                          openFaq === index ? 'rotate-180' : ''
                        }`} 
                      />
                    </div>
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-6">
                      <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-500 to-cyan-400 text-white">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Comece sua jornada de autoconhecimento hoje
            </h2>
            <p className="text-xl mb-8 text-white/90 leading-relaxed">
              Não é preciso enfrentar seus sentimentos sozinho. Nossa IA está aqui para oferecer um espaço seguro de reflexão e apoio emocional.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button 
                onClick={openChat}
                className="bg-white text-blue-500 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all transform hover:scale-105 shadow-lg"
              >
                <Play className="mr-2" />
                Iniciar Teste Grátis Agora
              </Button>
              <div className="flex items-center space-x-2 text-white/80">
                <Clock size={20} />
                <span>5 minutos • Sem compromisso</span>
              </div>
            </div>
            <div className="flex justify-center space-x-8 text-white/80 text-sm">
              <div className="flex items-center space-x-2">
                <Shield size={16} />
                <span>Dados protegidos</span>
              </div>
              <div className="flex items-center space-x-2">
                <KeyRound size={16} />
                <span>Totalmente anônimo</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe size={16} />
                <span>Feito para brasileiros</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="sobre" className="bg-slate-800 text-white py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-400 rounded-lg flex items-center justify-center">
                  <Heart className="text-white text-xl" />
                </div>
                <span className="text-2xl font-bold">Aconselha Aí</span>
              </div>
              <p className="text-slate-300 leading-relaxed mb-6 max-w-md">
                Tecnologia de IA desenvolvida com carinho para oferecer suporte emocional acessível, seguro e culturalmente relevante para brasileiros.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center hover:bg-slate-600 transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="#" className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center hover:bg-slate-600 transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="#" className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center hover:bg-slate-600 transition-colors">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Recursos</h3>
              <ul className="space-y-2 text-slate-300">
                <li><a href="#" className="hover:text-white transition-colors">Como Funciona</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Segurança</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacidade</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Suporte</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Legal</h3>
              <ul className="space-y-2 text-slate-300">
                <li><a href="#" className="hover:text-white transition-colors">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Política de Privacidade</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Disclaimer</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-700 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-slate-400 text-sm">
                © 2024 Aconselha Aí. Todos os direitos reservados.
              </p>
              <p className="text-slate-400 text-sm mt-4 md:mt-0 flex items-center">
                <TriangleAlert className="mr-2" size={16} />
                Este serviço não substitui atendimento psicológico profissional.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Chat Modal */}
      <ChatModal isOpen={isChatOpen} onClose={closeChat} />
    </div>
  );
}
