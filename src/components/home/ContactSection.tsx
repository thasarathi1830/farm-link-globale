
import React from 'react';
import { MapPin, Mail, Phone } from 'lucide-react';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

interface ContactSectionProps {
  contactRef: React.RefObject<HTMLDivElement>;
}

// Schema for contact form
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactSection = ({ contactRef }: ContactSectionProps) => {
  // Form for contact
  const contactForm = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const onContactSubmit = (data: ContactFormData) => {
    console.log('Contact form submitted:', data);
    // Here you would handle form submission (contact)
    toast.success("Message sent! We'll get back to you soon.");
    contactForm.reset();
  };

  return (
    <section ref={contactRef} className="w-full py-12 md:py-24 bg-white" id="contact">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4 mb-8">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Contact Us
          </h2>
          <p className="max-w-[700px] text-gray-600 md:text-lg mx-auto">
            Have questions? Want to learn more? Get in touch with us.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex flex-col space-y-6">
            <div className="flex items-center gap-3">
              <MapPin className="h-6 w-6 text-agrilink-green" />
              <div>
                <h3 className="font-medium text-lg">Our Address</h3>
                <p className="text-gray-600">AgriLink HQ, 42 Greenfield Avenue, Chennai, Tamil Nadu</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-6 w-6 text-agrilink-green" />
              <div>
                <h3 className="font-medium text-lg">Email</h3>
                <p className="text-gray-600">support@agrilink.io</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-6 w-6 text-agrilink-green" />
              <div>
                <h3 className="font-medium text-lg">Phone</h3>
                <p className="text-gray-600">+91-98765-43210</p>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Send Us a Message</h3>
            
            <Form {...contactForm}>
              <form onSubmit={contactForm.handleSubmit(onContactSubmit)} className="space-y-4">
                <FormField
                  control={contactForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={contactForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="your@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={contactForm.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="How can we help you?" 
                          className="min-h-[120px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full">Submit Message</Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
