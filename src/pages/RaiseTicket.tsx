import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useSupport } from "@/hooks/useSupport";
import { createTicketSchema } from "@/lib/schemas/supportSchemas";
import { toast } from "sonner";

const RaiseTicket = () => {
  const navigate = useNavigate();
  const { createNewTicket, isLoading, error, clearError } = useSupport();

const handleSubmit = async (
  values: { issue: string; title: string; description: string; attachment?: File | null },
  { setSubmitting, resetForm }: any
) => {
  try {
    const result = await createNewTicket({
      issue: values.issue as 'Booking Related' | 'Account Related' | 'Payment Related',
      title: values.title,
      description: values.description,
      attachment: values.attachment ?? undefined, 
    });

    if (result?.success) {
      toast.success("Ticket created successfully! You will receive a confirmation email shortly.");
      resetForm();
      navigate("/support");
    } else {
      toast.error("Failed to create ticket. Please try again.");
    }
  } catch (error) {
    toast.error("An error occurred while creating the ticket.");
  } finally {
    setSubmitting(false);
  }
};


  const handleBack = () => {
    navigate("/support");
  };

  // Clear any existing errors when component mounts
  useEffect(() => {
    clearError();
  }, [clearError]);

  return (
    <div className="min-h-screen bg-white">
      <Sidebar />

      <div className="lg:ml-64 flex flex-col">
        <Header onStartTour={() => {}} />

        <main className="flex-1 p-4 sm:p-6">
          <div className="mb-4 sm:mb-6">
            <Button variant="outline" onClick={handleBack} className="mb-3 sm:mb-4 border-blue-300 text-blue-700 hover:bg-blue-50 text-sm sm:text-base">
              <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Back to Support
            </Button>
            <h1 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-1 sm:mb-2">Raise Support Ticket</h1>
            <p className="text-sm sm:text-base text-blue-700">Tell us about your issue and we'll help you resolve it</p>
          </div>

          <div className="w-full max-w-2xl mx-auto">
            <Card className="p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl bg-white border border-blue-100 shadow-xl">
              <Formik
                initialValues={{
                  issue: "",
                  title: "",
                  description: "",
                  attachment: null,
                }}
                validationSchema={createTicketSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, errors, touched, setFieldValue, values }) => (
                  <Form className="space-y-4 sm:space-y-6">
                    <div>
                      <Label htmlFor="issue" className="block text-sm font-semibold text-blue-900 mb-2">
                        Issue Type
                      </Label>
                      <Select
                        value={values.issue}
                        onValueChange={(value) => setFieldValue('issue', value)}
                      >
                        <SelectTrigger className={`rounded-lg sm:rounded-xl border-blue-200 bg-white text-blue-900 focus:border-blue-400 focus:ring-blue-200 text-sm sm:text-base ${errors.issue && touched.issue ? 'border-red-500' : ''
                          }`}>
                          <SelectValue placeholder="Select issue type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Booking Related">Booking Related</SelectItem>
                          <SelectItem value="Account Related">Account Related</SelectItem>
                          <SelectItem value="Payment Related">Payment Related</SelectItem>
                        </SelectContent>
                      </Select>
                      <ErrorMessage name="issue" component="div" className="text-red-500 text-xs sm:text-sm mt-1" />
                    </div>

                    <div>
                      <Label htmlFor="title" className="block text-sm font-semibold text-blue-900 mb-2">
                        Title
                      </Label>
                      <Field
                        as={Input}
                        id="title"
                        name="title"
                        placeholder="Brief description of your issue"
                        className={`rounded-lg sm:rounded-xl border-blue-200 bg-white text-blue-900 focus:border-blue-400 focus:ring-blue-200 text-sm sm:text-base ${errors.title && touched.title ? 'border-red-500' : ''
                          }`}
                      />
                      <ErrorMessage name="title" component="div" className="text-red-500 text-xs sm:text-sm mt-1" />
                    </div>

                    <div>
                      <Label htmlFor="description" className="block text-sm font-semibold text-blue-900 mb-2">
                        Description
                      </Label>
                      <Field
                        as={Textarea}
                        id="description"
                        name="description"
                        placeholder="Please describe your issue in detail. Include any error messages, steps you've taken, and what you were trying to do when the issue occurred."
                        rows={6}
                        className={`rounded-lg sm:rounded-xl border-blue-200 bg-white text-blue-900 focus:border-blue-400 focus:ring-blue-200 text-sm sm:text-base ${errors.description && touched.description ? 'border-red-500' : ''
                          }`}
                      />
                      <ErrorMessage name="description" component="div" className="text-red-500 text-xs sm:text-sm mt-1" />
                    </div>

                    <div>
                      <Label htmlFor="attachment" className="block text-sm font-semibold text-blue-900 mb-2">
                        Attachment (optional)
                      </Label>
                      <input
                        id="attachment"
                        name="attachment"
                        type="file"
                        accept=".png,.jpg,.jpeg,.pdf,.doc,.docx"
                        onChange={(event) => {
                          setFieldValue("attachment", event.currentTarget.files?.[0]);
                        }}
                        className="block w-full text-xs sm:text-sm text-blue-900 file:mr-2 sm:file:mr-4 file:py-1 sm:file:py-2 file:px-2 sm:file:px-4
                file:rounded-lg sm:file:rounded-xl file:border-0 file:text-xs sm:file:text-sm file:font-semibold
                file:bg-yellow-100 file:text-yellow-800 hover:file:bg-yellow-200
                border border-blue-200 rounded-lg sm:rounded-xl p-2"
                      />
                    </div>


                    {error && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600 text-xs sm:text-sm">{error}</p>
                      </div>
                    )}

                    <Button
                      type="submit"
                      disabled={isSubmitting || isLoading}
                      className="w-full bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg sm:rounded-xl text-sm sm:text-lg py-3 sm:py-4 flex items-center justify-center space-x-2 border-0 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>{isSubmitting || isLoading ? "Creating Ticket..." : "Send Ticket"}</span>
                    </Button>
                  </Form>
                )}
              </Formik>

              <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-50 rounded-lg sm:rounded-xl border border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-2 text-sm sm:text-base">What happens next?</h3>
                <ul className="text-xs sm:text-sm text-blue-700 space-y-1">
                  <li>• You'll receive a confirmation email with your ticket number</li>
                  <li>• Our support team will review your issue within 24 hours</li>
                  <li>• We'll contact you via email with updates or questions</li>
                  <li>• You can track your ticket status in the Support section</li>
                </ul>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default RaiseTicket;
