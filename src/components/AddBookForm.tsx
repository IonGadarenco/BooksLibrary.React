import { Box, TextField, Button, IconButton, Typography, Input, Alert } from '@mui/material';
import { FieldArray, Formik, Form, type FormikErrors } from 'formik';
import * as Yup from 'yup';
import { Add, Remove } from '@mui/icons-material';
import { useApi } from '../api/axiosInstance';
import { useState } from 'react';
import { AxiosError } from 'axios';

interface Author {
  fullName: string;
}

interface Category {
  fullName: string;
}

interface Publisher {
  fullName: string;
  address: string;
}

interface BookFormValues {
  title: string;
  description: string;
  isbn: string;
  totalCopies: number;
  publisher: Publisher;
  authors: Author[];
  categories: Category[];
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string(),
  isbn: Yup.string().required('ISBN is required'),
  totalCopies: Yup.number()
    .min(1, 'Total copies must be at least 1')
    .required('Total copies required'),
  publisher: Yup.object().shape({
    fullName: Yup.string().required('Publisher name is required'),
    address: Yup.string().required('Publisher address is required'),
  }),
  authors: Yup.array()
    .of(Yup.object().shape({ fullName: Yup.string().required('Author name is required') }))
    .min(1, 'At least one author is required'),
  categories: Yup.array()
    .of(Yup.object().shape({ fullName: Yup.string().required('Category name is required') }))
    .min(1, 'At least one category is required'),
});

const AddBookForm = () => {
  const api = useApi();
  const [selectedCoverImage, setSelectedCoverImage] = useState<File | null>(null);
  const [previewCoverImageUrl, setPreviewCoverImageUrl] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleCoverImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      setSelectedCoverImage(file);
      setPreviewCoverImageUrl(URL.createObjectURL(file));
      setUploadError(null);
    } else {
      setSelectedCoverImage(null);
      setPreviewCoverImageUrl(null);
    }
  };

  return (
    <Box maxWidth={800} mx="auto" mt={4}>
      <Typography variant="h5" gutterBottom>
        Add a New Book
      </Typography>

      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      )}
      {uploadError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {uploadError}
        </Alert>
      )}

      <Formik<BookFormValues>
        initialValues={{
          title: '',
          description: '',
          isbn: '',
          totalCopies: 1,
          publisher: {
            fullName: '',
            address: '',
          },
          authors: [{ fullName: '' }],
          categories: [{ fullName: '' }],
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          setUploadError(null);
          setSuccessMessage(null);

          try {
            const formData = new FormData();

            formData.append('title', values.title);
            formData.append('description', values.description);
            formData.append('isbn', values.isbn);
            formData.append('totalCopies', values.totalCopies.toString());

            formData.append('Publisher.FullName', values.publisher.fullName);
            formData.append('Publisher.Address', values.publisher.address);

            values.authors.forEach((author, index) => {
              formData.append(`Authors[${index}].FullName`, author.fullName);
            });

            values.categories.forEach((category, index) => {
              formData.append(`Categories[${index}].FullName`, category.fullName);
            });

            if (selectedCoverImage) {
              formData.append('coverImageFile', selectedCoverImage);
            }

            const response = await api.post('/books', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
            console.log('📘 Book added successfully:', response.data);
            setSuccessMessage(`Book "${response.data.title}" added successfully!`);
            resetForm();
            setSelectedCoverImage(null);
            setPreviewCoverImageUrl(null);
          } catch (error) {
            const axiosError = error as AxiosError;
            console.error(
              'Error submitting book:',
              axiosError.response?.data || axiosError.message
            );

            const errorMessage =
                (axiosError.response?.data as any)?.title ||
                (axiosError.response?.data as string) ||
                axiosError.message ||
                'Failed to add book. Please try again.';
            setUploadError(errorMessage);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ values, handleChange, errors, touched, isSubmitting }) => {
          const getNestedFieldError = <T, K extends keyof T>(
            fieldErrors: FormikErrors<T> | undefined,
            index: number,
            fieldName: keyof (T[K] extends (infer U)[] ? U : never)
          ): string | undefined => {
            if (!fieldErrors || typeof fieldErrors === 'string') {
                return undefined; 
            }

            const indexedError = (fieldErrors as any)[index];
            if (indexedError && typeof indexedError === 'object' && fieldName in indexedError) {
              return indexedError[fieldName];
            }
            return undefined;
          };

          return (
            <Form>
              <TextField
                fullWidth
                margin="normal"
                label="Title"
                name="title"
                value={values.title}
                onChange={handleChange}
                error={touched.title && !!errors.title}
                helperText={touched.title && errors.title}
              />

              <TextField
                fullWidth
                margin="normal"
                label="Description"
                name="description"
                value={values.description}
                onChange={handleChange}
                multiline
                rows={3}
                error={touched.description && !!errors.description}
                helperText={touched.description && errors.description}
              />

              <TextField
                fullWidth
                margin="normal"
                label="ISBN"
                name="isbn"
                value={values.isbn}
                onChange={handleChange}
                error={touched.isbn && !!errors.isbn}
                helperText={touched.isbn && errors.isbn}
              />

              <TextField
                fullWidth
                margin="normal"
                label="Total Copies"
                name="totalCopies"
                type="number"
                value={values.totalCopies}
                onChange={handleChange}
                error={touched.totalCopies && !!errors.totalCopies}
                helperText={touched.totalCopies && errors.totalCopies}
              />

              <Typography mt={3} variant="h6">
                Publisher
              </Typography>

              <TextField
                fullWidth
                margin="normal"
                label="Publisher Name"
                name="publisher.fullName"
                value={values.publisher.fullName}
                onChange={handleChange}
                error={touched.publisher?.fullName && !!errors.publisher?.fullName}
                helperText={touched.publisher?.fullName && errors.publisher?.fullName}
              />

              <TextField
                fullWidth
                margin="normal"
                label="Publisher Address"
                name="publisher.address"
                value={values.publisher.address}
                onChange={handleChange}
                error={touched.publisher?.address && !!errors.publisher?.address}
                helperText={touched.publisher?.address && errors.publisher?.address}
              />

              <FieldArray name="authors">
                {({ push, remove }) => (
                  <Box mt={3}>
                    <Typography variant="h6">Authors</Typography>
                    {values.authors.map((author, index) => (
                      <Box key={index} display="flex" gap={1} alignItems="center" mt={1}>
                        <TextField
                          label={`Author ${index + 1}`}
                          name={`authors[${index}].fullName`}
                          value={author.fullName}
                          onChange={handleChange}
                          fullWidth
                          error={
                            touched.authors?.[index]?.fullName &&
                            !!getNestedFieldError(errors.authors as FormikErrors<Author[]>, index, 'fullName')
                          }
                          helperText={
                            touched.authors?.[index]?.fullName &&
                            getNestedFieldError(errors.authors as FormikErrors<Author[]>, index, 'fullName')
                          }
                        />
                        <IconButton
                          onClick={() => remove(index)}
                          disabled={values.authors.length === 1}
                        >
                          <Remove />
                        </IconButton>
                      </Box>
                    ))}
                    <Button onClick={() => push({ fullName: '' })} startIcon={<Add />} sx={{ mt: 1 }}>
                      Add Author
                    </Button>
                    {touched.authors && typeof errors.authors === 'string' && (
                      <Typography color="error" variant="caption">
                        {errors.authors}
                      </Typography>
                    )}
                  </Box>
                )}
              </FieldArray>

              <FieldArray name="categories">
                {({ push, remove }) => (
                  <Box mt={3}>
                    <Typography variant="h6">Categories</Typography>
                    {values.categories.map(
                      (
                        category,
                        index
                      ) => (
                        <Box key={index} display="flex" gap={1} alignItems="center" mt={1}>
                          <TextField
                            label={`Category ${index + 1}`}
                            name={`categories[${index}].fullName`}
                            value={category.fullName}
                            onChange={handleChange}
                            fullWidth
                            error={
                              touched.categories?.[index]?.fullName &&
                              !!getNestedFieldError(errors.categories as FormikErrors<Category[]>, index, 'fullName')
                            }
                            helperText={
                              touched.categories?.[index]?.fullName &&
                              getNestedFieldError(errors.categories as FormikErrors<Category[]>, index, 'fullName')
                            }
                          />
                          <IconButton
                            onClick={() => remove(index)}
                            disabled={values.categories.length === 1}
                          >
                            <Remove />
                          </IconButton>
                        </Box>
                      )
                    )}
                    <Button onClick={() => push({ fullName: '' })} startIcon={<Add />} sx={{ mt: 1 }}>
                      Add Category
                    </Button>
                    {touched.categories &&
                      typeof errors.categories === 'string' && (
                        <Typography color="error" variant="caption">
                          {errors.categories}
                        </Typography>
                      )}
                  </Box>
                )}
              </FieldArray>

              <Typography mt={3} variant="h6">
                Add Book Cover Image
              </Typography>

              <Input
                type="file"
                name="coverImageFile"
                onChange={handleCoverImageChange}
                inputProps={{ accept: 'image/*' }}
                sx={{ mt: 1 }}
              />
              {previewCoverImageUrl && (
                <Box mt={2}>
                  <img
                    src={previewCoverImageUrl}
                    alt="Cover Preview"
                    style={{ maxWidth: '200px', height: 'auto', display: 'block' }}
                  />
                  <Typography variant="caption">Image Preview</Typography>
                </Box>
              )}

              <Box mt={4}>
                <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit Book'}
                </Button>
              </Box>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default AddBookForm;