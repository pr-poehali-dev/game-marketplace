
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
  {
    question: "Как происходит оплата?",
    answer: "После оформления заявки мы свяжемся с вами по указанной почте и обсудим детали оплаты. Поддерживаем различные способы оплаты."
  },
  {
    question: "Как быстро я получу доступ к игре?",
    answer: "После подтверждения оплаты вы получите доступ к игре в течение 24 часов на указанный email."
  },
  {
    question: "Можно ли купить Robux?",
    answer: "Да, мы также продаем Robux. Для уточнения цен, пожалуйста, напишите на указанную почту bespalovae2013@gmail.com."
  },
  {
    question: "Доступна ли техническая поддержка?",
    answer: "Да, по всем вопросам технической поддержки вы можете обращаться на почту bespalovae2013@gmail.com."
  },
  {
    question: "Планируется ли добавление других игр?",
    answer: "Да, постоянно расширяем ассортимент. Если интересует конкретная игра, напишите нам на почту bespalovae2013@gmail.com."
  }
];

const FAQ: React.FC = () => {
  return (
    <section className="w-full max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Часто задаваемые вопросы</h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent>
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default FAQ;
