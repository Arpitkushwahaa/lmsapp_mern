import React from 'react';
import { Button } from './ui/button';
import { useCreateOrderMutation } from '@/features/api/razorpayApi';
import { useGetCourseDetailWithStatusQuery } from '@/features/api/purchaseApi';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

const BuyCourseButton = ({ courseId }) => {
  const { data: courseData, isLoading: isCourseLoading } = useGetCourseDetailWithStatusQuery(courseId);
  const [createOrder, { isLoading: isOrderLoading }] = useCreateOrderMutation();

  const purchaseCourseHandler = async () => {
    if (!courseData) return;

    localStorage.setItem('courseId', courseId);

    const order = await createOrder(courseData.course.coursePrice).unwrap();

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.order.amount,
      currency: 'INR',
      name: 'LMS Platform',
      description: 'Course Purchase',
      order_id: order.order.id,
      handler: async function (response) {
        const toastId = toast.loading("Verifying payment... Please do not close this page.");
        try {
          await axios.post(
            'http://localhost:8080/api/v1/payment/verify',
            response,
            {
              withCredentials: true,
            }
          );
          toast.success("Payment successful! Redirecting...", { id: toastId });
        } catch (error) {
          toast.error('Payment verification failed. Please contact support.', { id: toastId });
        }
      },
      theme: {
        color: '#3399cc',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <Button
      disabled={isCourseLoading || isOrderLoading}
      onClick={purchaseCourseHandler}
      className="w-full"
    >
      {isCourseLoading || isOrderLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </>
      ) : (
        'Purchase Course'
      )}
    </Button>
  );
};

export default BuyCourseButton;
