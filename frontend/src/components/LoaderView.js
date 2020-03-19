import React from 'react';
import '../App.scss';
import Spinner from 'react-bootstrap/Spinner';
import {useTranslation} from "react-i18next";

export default function LoaderView() {
    const { t } = useTranslation();

    return (
        <>
            <Spinner
                as="span"
                animation="grow"
                size="lg"
                role="status"
                aria-hidden="true"
            />
            {t('loading')}
        </>
    );
}