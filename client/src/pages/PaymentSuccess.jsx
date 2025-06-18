import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const reference = searchParams.get('reference');
    const courseId = localStorage.getItem('courseId');

    if (reference && courseId) {
      axios
        .post(
          'http://localhost:8080/api/v1/purchase/course',
          { paymentId: reference, courseId },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        .then((response) => {
          if (response.data.success) {
            localStorage.removeItem('courseId');
            navigate('/my-learning');
          } else {
            setError('Failed to record purchase. Please contact support.');
          }
        })
        .catch(() => {
          setError('An error occurred. Please try again.');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setError('Invalid payment reference or course ID.');
      setLoading(false);
    }
  }, [searchParams, navigate]);

  if (loading) {
    return <div>Processing your payment...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return <div>Payment successful! Redirecting to your courses...</div>;
};

export default PaymentSuccess;
