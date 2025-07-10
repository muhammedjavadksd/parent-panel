import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Filter, X } from 'lucide-react';
import { transactionFiltersSchema, transactionFiltersInitialValues } from '@/lib/schemas/transactionSchemas';
import { TransactionFilters as TransactionFiltersType } from '@/lib/interface/transactions';
import { TRANSACTION_TYPE_OPTIONS } from '@/shared/constants/transactions';

interface TransactionFiltersProps {
    filters: TransactionFiltersType;
    onFiltersChange: (filters: Partial<TransactionFiltersType>) => void;
    onResetFilters: () => void;
}

const TransactionFilters: React.FC<TransactionFiltersProps> = ({
    filters,
    onFiltersChange,
    onResetFilters,
}) => {
    const handleSubmit = (values: TransactionFiltersType) => {
        console.log('Form submitted with values:', values);
        onFiltersChange(values);
    };

    const handleReset = () => {
        onResetFilters();
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Filter className="w-5 h-5" />
                    Filter Transactions
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Formik
                    initialValues={{
                        ...transactionFiltersInitialValues,
                        ...filters,
                        type: filters.type || ''
                    }}
                    validationSchema={transactionFiltersSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize
                >
                    {({ isSubmitting, setFieldValue, values, submitForm }) => (
                        <Form className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Transaction Type */}
                                <div className="space-y-2">
                                    <Label htmlFor="type">Transaction Type</Label>
                                    <Select
                                        value={values.type === '' ? 'all' : values.type}
                                        onValueChange={(value) => {
                                            const newValue = value === 'all' ? '' : value;
                                            setFieldValue('type', newValue);
                                            console.log('Type changed to:', newValue);
                                        }}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="All Types" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Types</SelectItem>
                                            {TRANSACTION_TYPE_OPTIONS.map((option) => (
                                                <SelectItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <ErrorMessage name="type" component="div" className="text-red-500 text-xs" />
                                </div>

                                {/* Start Date */}
                                <div className="space-y-2">
                                    <Label htmlFor="start_date">Start Date</Label>
                                    <Field
                                        as={Input}
                                        type="date"
                                        name="start_date"
                                        id="start_date"
                                    />
                                    <ErrorMessage name="start_date" component="div" className="text-red-500 text-xs" />
                                </div>

                                {/* End Date */}
                                <div className="space-y-2">
                                    <Label htmlFor="end_date">End Date</Label>
                                    <Field
                                        as={Input}
                                        type="date"
                                        name="end_date"
                                        id="end_date"
                                    />
                                    <ErrorMessage name="end_date" component="div" className="text-red-500 text-xs" />
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex items-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        <Filter className="w-4 h-4" />
                                    )}
                                    Apply Filters
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleReset}
                                    className="flex items-center gap-2"
                                >
                                    <X className="w-4 h-4" />
                                    Clear Filters
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </CardContent>
        </Card>
    );
};

export default TransactionFilters; 